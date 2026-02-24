"use client";

import { useRef } from "react";
import { Highlighted1, Highlighted2, Highlighted3 } from "./highlights";
import { TitleSection } from "./title";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Page() {
  return (
    <>
      <TitleSection />
      <DescriptionSection />
      <div className="h-screen" />
    </>
  );
}

function DescriptionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from("h2", {
        opacity: 0,
        duration: 1,
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen p-10 flex items-stretch justify-stretch"
    >
      <div className="title-container border-2 border-(--line) p-10 w-full flex items-center justify-center">
        <h2 className="text-[6vh] leading-[1.4] text-center text-balance max-w-7xl">
          <ScrollTriggerWord /> enables anyone to create{" "}
          <span className="whitespace-nowrap">jaw-dropping</span>{" "}
          <ScrollBasedWord /> animations with minimal code. Infinitely flexible.
          Scrub, pin, snap, or just <TriggerAnythingWord /> scroll-related, even
          if it has nothing to do{" "}
          <span className="whitespace-nowrap">with animation.</span>
        </h2>
      </div>
    </div>
  );
}

const ScrollTriggerWord = () => (
  <span className="relative">
    <Highlighted1 className="absolute top-[0.2em] left-0 w-[6em] mix-blend-multiply" />
    ScrollTrigger
  </span>
);
const ScrollBasedWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted2 className="absolute bottom-0 left-0 mix-blend-multiply" />
    scroll-based
  </span>
);
const TriggerAnythingWord = () => (
  <span className="whitespace-nowrap relative">
    <Highlighted3 className="absolute bottom-0 left-0 mix-blend-multiply" />
    trigger anything
  </span>
);
