import { cn } from "@/lib/utils";
import { Audiowide } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import s from "./styles.module.css";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-audiowide",
});

const geistMono = Geist_Mono({
  weight: "variable",
  display: "swap",
  variable: "--font-geist-mono",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        audiowide.variable,
        geistMono.variable,
        geistMono.className,
        s.section
      )}
    >
      <div className="fixed z-10 inset-0 bg-linear-to-t from-black to-[#1B1B1B]" />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
