import Image from "next/image";

export default function Banner() {
  return (
    <section
      className=" py-12 bg-darkBlue  "
      style={{
        backgroundImage: 'url("/assets/texture2.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-24 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <Image
              src="/assets/point.svg"
              alt="Background"
              width={47}
              height={47}
            />
            <h1 className="text-orange text-4xl lg:text-5xl font-bold">
              Hey there!!, <br />
              I&apos;m RonggoTM
            </h1>
          </div>
          <h3 className="text-cyan text-lg lg:text-2xl font-semibold">
            Passionate Frontend and Android Developer.
          </h3>
        </div>
        <div className="relative mt-8 lg:mt-0">
          <div className="w-full lg:w-[500px] h-[300px] lg:h-[618px] bg-[#496A71] rounded-tl-[333px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[333px] shadow-lg"></div>
          <div className="w-full lg:w-[465px] h-[300px] lg:h-[577px] bg-grey absolute left-[0] lg:left-[35px] top-[0] lg:top-[41px] rounded-tl-[333px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[333px] shadow-lg"></div>
          <Image
            src={"/assets/photoProfile.png"}
            alt="Hero"
            width={411}
            height={300}
            className="absolute left-[0] lg:left-[89px] top-[0] lg:top-[34px] rounded-tr-[50px] rounded-bl-[50px] rounded-br-[333px]"
          />
        </div>
      </div>
    </section>
  );
}
