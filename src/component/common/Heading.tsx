import Image from "next/image";

type HeadingProps = React.ComponentPropsWithoutRef<"div"> & {
  text: string;
};

export default function Heading({ text, ...rest }: HeadingProps) {
  return (
    <div className="flex items-center gap-4">
      <Image src="/assets/point.svg" alt="Background" width={47} height={47} />
      <h1 className="text-orange text-5xl font-bold">{text}</h1>
    </div>
  );
}
