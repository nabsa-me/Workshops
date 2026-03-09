"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      SplitText.create(".title", {
        type: "words, chars",
        wordsClass: "title-word++",
        charsClass: "title-char++",
        mask: "chars",
      });

      const tl = gsap.timeline();

      tl.from(".title-word1 .title-char", {
        y: "100%",
        duration: 0.5,
        stagger: 0.07,
        ease: "circ.out",
      });

      tl.from(
        ".title-word2 .title-char",
        {
          x: "-100%",
          duration: 0.2,
          stagger: 0.07,
          ease: "circ.inOut",
        },
        "-=0.5s"
      );

      tl.from(
        ".tl-start",
        {
          height: 0,
          duration: 0.4,
          ease: "circ.out",
        },
        "<"
      );

      tl.from(
        ".tl-main",
        {
          width: 0,
          duration: 0.8,
          ease: "circ.out",
        },
        "<+0.2s"
      );

      tl.from(
        ".title-word3 .title-char",
        {
          y: "-100%",
          duration: 0.3,
          stagger: 0.07,
          ease: "circ.out",
        },
        "-=0.5s"
      );

      tl.to(
        ".tl-dot",
        {
          opacity: 1,
          duration: 0.01,
          repeat: 6,
          yoyo: true,
          repeatDelay: 0.05,
          ease: "circ.out",
        },
        1
      );

      GSDevTools.create({ animation: tl });
    },
    {
      scope: containerRef,
    }
  );

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
          <div className="tl-dot absolute -top-[0.08em] -right-[0.16em] h-[0.08em] aspect-square bg-orange-500 opacity-0" />
        </span>
        <span className="relative block left-[1.6em] text-right">basics</span>
      </h1>
    </div>
  );
}
