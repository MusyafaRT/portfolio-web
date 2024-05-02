"use client";

import { useState } from "react";
import Link from "next/link";
import Contact from "../Footer/Contact";
import { MdMenuBook } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-darkBlue border-gray-200 dark:bg-darkBlue text-cyan fixed w-full top-0 z-10">
        <div className="max-w-6xl mx-auto p-4 relative">
          <div className="flex items-center justify-between ">
            <h1 className="text-3xl font-bold">RonggoTM</h1>
            <div
              className="gap-14 hidden w-full md:flex md:w-auto"
              id="navbar-default"
            >
              <Link href="/">
                <h2 className="text-2xl font-medium">My Story</h2>
              </Link>
              <Link href="/portfolio">
                <h2 className="text-2xl font-medium">Portofolio</h2>
              </Link>
              <Contact />
            </div>
            <button onClick={handleToggle} className="block md:hidden">
              {navbarOpen ? (
                <MdMenuBook size={"2.5em"} />
              ) : (
                <BiFoodMenu size={"2.5em"} />
              )}
            </button>
          </div>
          {/* Mobile Navbar */}
          {navbarOpen && (
            <div
              className={`px-2 py-6 gap-3 text-cyan bg-darkBlue absolute top-full left-0 z-10 w-full md:hidden`}
            >
              <div className="flex flex-col justify-center items-center md:hidden">
                <Link href="/">
                  <h2 className="text-lg font-medium">My Story</h2>
                </Link>
                <Link href="/about" className="py-2">
                  <h2 className="text-lg font-medium">Portofolio</h2>
                </Link>
                <Contact />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
