"use client";

import { DrawSVGPlugin, ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { OutlineLogo, SolidLogo } from "./logos";
import s from "./styles.module.css";
import { cn } from "@/lib/utils";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export default function Page() {
  return (
    <div className="bg-black p-24 relative">
      <div className={cn(s.ruler, "absolute left-0 top-0 h-full w-8")} />
      <div className={cn(s.ruler, "absolute right-0 top-0 h-full w-8")} />
      <Animation />
    </div>
  );
}

function Animation() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".pinned",
          scrub: 1,
        },
      });

      tl.set(".outline-logo", {
        opacity: 1,
      });

      tl.from(".outline-logo path", {
        drawSVG: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "power2.out",
      });

      tl.to(".solid-logo", {
        opacity: 1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="h-[300vh] relative bg-black border border-[#444]"
    >
      <div className="pinned flex h-screen justify-center items-center">
        <div className="realtive">
          <OutlineLogo className="outline-logo opacity-0 absolute" />
          <SolidLogo className="solid-logo opacity-0 relative" />
        </div>
      </div>
    </div>
  );
}
