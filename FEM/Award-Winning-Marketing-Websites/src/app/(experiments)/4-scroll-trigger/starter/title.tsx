"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

export function TitleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      SplitText.create("h1", {
        type: "words, chars",
        wordsClass: "word",
        mask: "words",
      });

      gsap.from("h1 .word", {
        y: "100%",
        stagger: 0.1,
        ease: "circ.inOut",
      });
    },
    { scope: containerRef }
  );
  return (
    <div
      ref={containerRef}
      className="flex h-screen items-center justify-center"
    >
      <h1 className="title font-black text-[10vh] leading-[1.3] pb-[0.1em] flex flex-col gap-[0.1em] relative right-[0.5em] [&>span]:-mb-[0.3em]">
        <span className="block relative text-left text-(--dark-green) italic font-thin">
          gsap
        </span>
        <span className="block relative text-right uppercase font-thin">
          scroll
        </span>
        <span className="block relative text-left uppercase font-thin">
          triggered
        </span>
        <span className="block relative left-[1.5em] text-right text-(--dark-green) italic font-thin">
          animations
        </span>
      </h1>
    </div>
  );
}
