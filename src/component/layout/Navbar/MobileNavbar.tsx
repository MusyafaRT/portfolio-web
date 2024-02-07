import Link from "next/link";
import { useState } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";
import Contact from "../Footer/Contact";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="flex justify-between items-center text-cyan py-6 px-10 bg-darkBlue desktop:hidden">
        <h1 className="text-2xl font-bold">RonggoTM</h1>
        <button onClick={handleToggle}>
          {open ? <MdMenuBook size={"2.5em"} /> : <BiFoodMenu size={"2.5em"} />}
        </button>
      </nav>
      <div
        className={`flex-col px-2 py-6 gap-3 text-cyan justify-center items-center bg-grey ${open ? "flex" : "hidden"} desktop:hidden`}
      >
        <Link href="/">
          <h2 className="text-lg font-medium">My Story</h2>
        </Link>
        <Link href="/about" className="py-2">
          <h2 className="text-lg font-medium">Portofolio</h2>
        </Link>
        <Contact />
      </div>
    </>
  );
}
