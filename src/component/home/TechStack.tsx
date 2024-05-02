import Image from "next/image";

export default function TechStack() {
  const techStack = ["kotlin", "android", "js", "tailwind", "react", "next"];
  return (
    <>
      <section
        className="flex flex-col items-center bg-darkBlue gap-10 py-28"
        style={{
          backgroundImage: 'url("/assets/texture1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center gap-4">
          <Image
            src="/assets/point.svg"
            alt="Background"
            width={47}
            height={47}
          />
          <h1 className="text-orange text-5xl font-bold">
            Skills and Tech Stack
          </h1>
        </div>
        <div className="flex flex-wrap gap-16 px-10 items-center">
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
