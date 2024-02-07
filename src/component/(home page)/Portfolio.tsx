"use client";
import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import PortfolioCard from "../portfolio/PortfolioCard";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import axios from "axios";

const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className={`bg-darkBlue text-cyan flex items-start w-[350px] aspect-[4/3] p-6 rounded-3xl animate-pulse ${index !== 0 ? "scale-[0.8]" : ""}`}
  >
    {/* Skeleton content */}
  </div>
);

export default function Portfolio() {
  const [data, setData] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserRepos = async () => {
    try {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: "Bearer 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",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        params: {
          visibility: "all",
        },
      });
      const sortedData = response.data.sort(
        (a: GitHubRepository, b: GitHubRepository) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      );
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user repositories:", error);
    }
  };

  useEffect(() => {
    fetchUserRepos();
  }, []);

  return (
    <section className="py-16 bg-grey">
      <main className="max-w-6xl mx-auto flex flex-col gap-10">
        <Heading text="Portofolio" />
        <div className="block">
          {loading ? ( // Show skeleton loading UI while loading
            <div className="flex flex-wrap justify-center gap-10">
              {/* Render multiple skeleton cards */}
              {Array.from(Array(3).keys()).map((index) => (
                <SkeletonCard key={index} index={index} />
              ))}
            </div>
          ) : (
            // Render actual data once loaded
            <Swiper
              spaceBetween={25}
              slidesPerView={3}
              loop
              navigation={{
                nextEl: ".next-button-el",
              }}
              modules={[Navigation]}
              onSwiper={(swiper) => console.log(swiper)}
              className="porto"
            >
              {data.map((repo) => (
                <SwiperSlide key={repo.id}>
                  <PortfolioCard repository={repo} />
                </SwiperSlide>
              ))}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-50 next-button-el">
                <Image
                  src="/assets/next-arrow.svg"
                  width={30}
                  height={30}
                  alt="next"
                />
              </div>
            </Swiper>
          )}
        </div>
      </main>
    </section>
  );
}
