import Footer from "@/components/footer/footer";
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Navbar></Navbar>
          <ToastContainer />
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
