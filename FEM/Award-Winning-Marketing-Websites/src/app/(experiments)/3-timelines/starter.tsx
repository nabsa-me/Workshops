"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { SplitText } from "gsap/all";
import gsap from "gsap";
gsap.registerPlugin(SplitText);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="bg-[#E5E5E5] text-[#2A2A2A] flex h-screen items-center justify-center tracking-tighter"
    >
      <h1 className="title font-bold text-[min(20vh,10vw)] flex flex-col gap-[0.2em] leading-none text-left uppercase">
        <span className="relative block right-[1.5em] text-left">GSAP</span>
        <span className="relative block">
          <span>timeline</span>
          {/* Timeline */}
          <div className="absolute w-full -bottom-[0.04em] h-[0.04em]">
            <div className="tl-main absolute w-full bottom-0 h-[0.04em] bg-orange-500" />
            <div className="tl-start absolute left-0 top-1/2 -translate-y-1/2 h-[0.16em] w-[0.04em] bg-orange-500" />
          </div>
          {/* Dot */}
          <div className="tl-dot absolute -top-[0.08em] -right-[0.16em] h-[0.08em] aspect-square bg-orange-500 opacity-100" />
        </span>
        <span className="relative block left-[1.6em] text-right">basics</span>
      </h1>
    </div>
  );
}
