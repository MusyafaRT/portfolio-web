import Link from "next/link";
import Contact from "../Footer/Contact";

export default function DesktopNav() {
  return (
    <>
      <nav className=" text-cyan  p-6  bg-darkBlue">
        <div className="max-w-6xl mx-auto desktop:flex items-center justify-between hidden">
          <h1 className="text-3xl font-bold">RonggoTM</h1>
          <div className="flex gap-14">
            <Link href="/">
              <h2 className="text-2xl font-medium">My Story</h2>
            </Link>
            <Link href="/about">
              <h2 className="text-2xl font-medium">Portofolio</h2>
            </Link>
            <Contact />
          </div>
        </div>
      </nav>
    </>
  );
}
