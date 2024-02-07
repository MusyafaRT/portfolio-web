import Link from "next/link";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

export default function Contact() {
  return (
    <>
      <div className="flex gap-6 text-lg desktop:text-2xl items-center">
        <Link href="https://www.facebook.com/ronggo.musyafa">
          <BsFacebook />
        </Link>
        <Link href="https://www.instagram.com/ronggotm">
          <BsInstagram />
        </Link>
        <Link href="https://www.linkedin.com/in/ronggo-tsani-musyafa-419950217/">
          <BsLinkedin />
        </Link>
      </div>
    </>
  );
}
