"use client";
import React from "react";
import Heading from "../common/Heading";
import PortfolioCard from "./PortfolioCard";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./Portfolio.css";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { ListProjectRes } from "@/types/api/Project";
import useFetchApi from "../common/hooks/useFetchApi";

const SkeletonCard = ({ index }: { index: number }) => (
  <div
    className={`bg-darkBlue text-cyan flex items-start w-[350px] aspect-[4/3] p-6 rounded-3xl animate-pulse ${index !== 0 ? "scale-[0.8]" : ""}`}
  >
    {/* Skeleton content */}
  </div>
);

export default function Portfolio() {
  const { data, error, isLoading } = useFetchApi<null, ListProjectRes>(
    "/api/project",
    null,
    { method: "GET" },
    { skipCall: false, revalidateOnMount: true }
  );

  return (
    <section className="h-screen bg-grey flex w-full flex-col justify-center items-center gap-4 ">
      <div className="max-w-6xl w-full gap-10 flex flex-col">
        <Heading text="Portofolio" />
        <div className="block w-full">
          {isLoading ? (
            <div className="flex flex-wrap justify-center gap-10">
              {Array.from(Array(3).keys()).map((index) => (
                <SkeletonCard key={index} index={index} />
              ))}
            </div>
          ) : (
            <Swiper
              spaceBetween={15}
              slidesPerView={3}
              loop
              navigation={{
                nextEl: ".next-button-el",
              }}
              modules={[Navigation]}
              className="porto"
            >
              {data?.project?.map((value, index) => (
                <SwiperSlide key={index}>
                  <PortfolioCard project={value} />
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
      </div>
    </section>
  );
}
