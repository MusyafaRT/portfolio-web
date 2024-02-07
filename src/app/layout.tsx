import Navbar from "@/component/layout/Navbar/Navbar";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/component/layout/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "RonggoTM",
  description: "Portfolio Web of Ronggo Tsani Musyafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="flex flex-col justify-center m-auto">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
