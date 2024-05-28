import Heading from "../common/Heading";
import TechStack from "./TechStack";
import Timeline from "./Timeline";

const TimelineData = [
  {
    date: "2019",
    text: "Started my journey on SMA TARUNA NUSANTARA",
  },
  {
    date: "2021",
    text: "Continued my journey on Universitas Gadjah Mada",
    detail: [
      "Softskill Training on Himpunan Mahasiswa Ilmu Komputer",
      "Learn about Frontend Development",
    ],
  },
  {
    date: "2023",
    text: "Learn about Mobile Development on Bangkit Academy",
  },
  {
    date: "2024",
    text: "Internship at Sekjen DIKTI as a Frontend Developer",
  },
];

export default function AboutPage() {
  return (
    <section className="flex flex-col justify-center items-center h-full px-2 pt-20 sm:pt-0 max-w-7xl mx-auto gap-10">
      <div className="flex flex-col md:flex-row gap-10 flex-1 justify-center items-center px-10 md:py-28">
        <div className="relative mt-8 lg:mt-0">
          <div className="relative bg-grey rounded-tl-[55%] rounded-tr-[5%] rounded-bl-[5%] rounded-br-[55%] border-[#496A71] border-[32px] overflow-hidden w-[250px] h-[380px] lg:w-[394px] lg:h-[518px] transition-transform duration-500 ease-in-out transform hover:scale-105">
            <div
              className="absolute inset-0 bg-no-repeat bg-left bg-cover"
              style={{
                backgroundImage: "url('/assets/photoProfile2.png')",
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col basis-1/2 gap-4">
          <Heading text="About Me!" />
          <h2 className="text-white font-medium text-sm md:text-base xl:text-xl">
            Hello! I&apos;m RonggoTM. I love to code a lot especially in
            <span className="text-orange"> frontend development</span>.
            You&apos;ll usually find me tinkering with
            <span className="text-orange"> Next.js</span> and
            <span className="text-orange"> Tailwind</span>, crafting cool stuff
            for the web. I&apos;m all about making websites that not only look
            awesome but also work like a charm on any device. With my trusty
            pals
            <span className="text-orange"> JavaScript</span> and
            <span className="text-orange"> React</span>, I whip up web apps that
            are as dynamic as they come.
            <br />
            <br />
            Lately, I&apos;ve been diving into mobile and backend development.
            I&apos;m learning
            <span className="text-orange"> Kotlin</span> and
            <span className="text-orange"> React Native</span> to build awesome
            mobile apps, and I&apos;m getting into
            <span className="text-orange"> Node.js</span>,
            <span className="text-orange"> Express</span>, and
            <span className="text-orange"> Prisma</span> to round out my backend
            skills. My goal is to become a full-stack developer who can handle
            any part of the development process.
            <br />
            <br />
            When I&apos;m not coding, you can find me playing video games or
            watching movies. I&apos;m always up for an adventure, whether
            it&apos;s hiking in the mountains or chilling on the beach. And{" "}
            <span className="text-orange">I LOVE CATS!!</span>
          </h2>
        </div>
      </div>
      <TechStack />
      <Timeline data={TimelineData} />
    </section>
  );
}
