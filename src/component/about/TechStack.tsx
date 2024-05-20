import Image from "next/image";
import Heading from "../common/Heading";

export default function TechStack() {
  const techStack = ["kotlin", "android", "js", "tailwind", "react", "next"];
  return (
    <>
      <section className="flex flex-col gap-10 w-full">
        <div className="flex items-center gap-4">
          <Heading text="Tech Stack" />
        </div>
        <div className="flex flex-wrap gap-16 px-10 items-center justify-center">
          {techStack.map((tech) => (
            <Image
              src={`/assets/${tech}.svg`}
              alt={tech}
              width={105}
              height={105}
              key={tech}
            />
          ))}
        </div>
      </section>
    </>
  );
}
