import Image from "next/image";

type HeadingProps = React.ComponentPropsWithoutRef<"div"> & {
  text: string;
};

export default function Heading({ text, ...rest }: HeadingProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/assets/point.svg"
        alt="Background"
        width={47}
        height={47}
        className="w-[37px] md:w-[47px] xl:w-[57px] h-auto"
      />
      <h1 className="text-orange text-2xl lg:text-4xl xl:text-5xl font-bold">
        {text}
      </h1>
    </div>
  );
}
