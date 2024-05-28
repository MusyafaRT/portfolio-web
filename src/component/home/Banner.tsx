import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section
      className="bg-darkBlue h-full flex flex-col lg:flex-row justify-between items-center lg:gap-24 "
      style={{
        backgroundImage: 'url("/assets/texture2.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-6xl mx-auto lg:gap-48">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <Image
              src="/assets/point.svg"
              alt="Background"
              width={47}
              height={47}
            />
            <h1 className="text-orange text-4xl lg:text-6xl font-bold">
              Hey there!! <br />
              I&apos;m RonggoTM
            </h1>
          </div>
          <h3 className="text-cyan text-xl lg:text-3xl font-semibold">
            Passionate <span className="type-skills text-orange"></span>
          </h3>
          <div className="flex gap-5">
            <Link
              href={"/contact"}
              className="text-darkBlue bg-orange px-4 py-2 text-2xl font-bold rounded-xl transition-transform duration-75 ease-in-out transform hover:scale-105"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="relative mt-8 lg:mt-0">
          <div className="relative bg-grey rounded-tl-[55%] rounded-tr-[5%] rounded-bl-[5%] rounded-br-[55%] border-[#496A71] border-[32px] overflow-hidden w-[350px] h-[480px] lg:w-[494px] lg:h-[618px] transition-transform duration-500 ease-in-out transform hover:scale-105">
            <div
              className="absolute inset-0 bg-no-repeat bg-left bg-cover"
              style={{
                backgroundImage: "url('/assets/photoProfile.png')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
