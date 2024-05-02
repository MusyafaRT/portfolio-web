import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/component/common/Footer/Footer";
import Provider from "@/component/Provider";
import Navbar from "@/component/common/Navbar/Navbar";

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
        <Provider>
          <main className="flex flex-col justify-center m-auto">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
