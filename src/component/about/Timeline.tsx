"use client";

import React, { useState, useEffect } from "react";
import Heading from "../common/Heading";

interface TimelineData {
  date: string;
  text: string;
  last?: boolean;
  detail?: string[];
}

const TimelineVertical = (props: TimelineData) => {
  return (
    <div className="relative flex items-start py-10">
      <div className="relative w-16 h-16 rounded-full bg-orange flex items-center justify-center z-10">
        <p className="text-white font-semibold">{props.date}</p>
      </div>
      {!props.last && (
        <div className="absolute h-full w-1 bg-gray-300 left-[1.85rem] top-1/3"></div>
      )}
      <div className="order-1 bg-grey rounded-lg shadow-xl w-5/6 px-6 py-4">
        <p className="text-sm leading-snug tracking-wide text-cyan text-opacity-100">
          {props.text}
        </p>
        {props.detail && (
          <ul className="list-disc ml-6">
            {props.detail.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const TimelineHorizontal = (props: TimelineData) => {
  return (
    <div className="relative flex flex-col items-center py-10">
      <div className="relative w-16 h-16 rounded-full bg-orange flex items-center justify-center z-10">
        <p className="text-white font-semibold">{props.date}</p>
      </div>
      {!props.last && (
        <div className="absolute h-1 w-full bg-gray-300 top-[4.5rem] left-1/2"></div>
      )}
      {/* Vertical line */}
      <div className="order-1 bg-grey rounded-lg shadow-md w-5/6 px-6 py-4 my-1">
        <p className="text-sm leading-snug tracking-wide text-cyan text-opacity-100">
          {props.text}
        </p>
        {props.detail && (
          <ul className="list-disc ml-6">
            {props.detail.map((item, index) => (
              <li key={index} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Timeline = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up
    };
  }, []);

  return (
    <section className="flex flex-col gap-10 py-28 max-w-7xl mx-auto">
      <Heading text="Journey Timeline" className="text-start" />
      <div className="flex flex-col sm:flex-row">
        {data.map((item, index) => (
          <div key={index}>
            {isMobile ? (
              <TimelineVertical
                date={item.date}
                text={item.text}
                last={index === data.length - 1}
                detail={item.detail}
              />
            ) : (
              <TimelineHorizontal
                date={item.date}
                text={item.text}
                last={index === data.length - 1}
                detail={item.detail}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
