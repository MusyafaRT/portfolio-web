"use client";

import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNav from "./DesktopNavbar";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  return (
    <>
      <MobileNavbar />
      <DesktopNav />
    </>
  );
}
