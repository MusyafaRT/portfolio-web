"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Heading from "../common/Heading";
import useFetchApi from "../common/hooks/useFetchApi";
import { ListStoryRes } from "@/types/api/Story";
import Image from "next/image";
import "swiper/css/effect-creative";

export default function StorySection() {
  const { data, error, isLoading } = useFetchApi<null, ListStoryRes>(
    "/api/story",
    null,
    { method: "GET" },
    { skipCall: false, revalidateOnMount: true }
  );

  return (
    <section className="h-screen bg-grey flex w-full flex-col justify-center items-center gap-4 ">
      <div className="max-w-6xl w-full gap-10 flex flex-col items-center justify-center mx-auto">
        <div className="block w-full h-[700px]">
          <Swiper
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[EffectCreative]}
            className="h-full"
          >
            {data?.story?.map((value, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <Image
                  src={value.contentImage}
                  alt="story-image"
                  fill
                  className="rounded-3xl fill object-fill"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
