import dynamic from "next/dynamic";

const Banner = dynamic(() => import("./Banner"));
const Portfolio = dynamic(() => import("./Portfolio"));
const TechStack = dynamic(() => import("./TechStack"));
export default function Home() {
  return (
    <>
      <main className="">
        <Banner />
        <Portfolio />
        <TechStack />
      </main>
    </>
  );
}
