"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      SplitText.create("h1", {
        type: "chars",
        charsClass:
          "char++ bg-linear-to-t from-black/10 to-white to-70% bg-clip-text",
        mask: "chars",
      });

      gsap.from("h1 .char", {
        x: "100%",
        rotateY: "90deg",
        stagger: 0.02,
        duration: 0.5,
        ease: "circ.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="h-[400vh]">
      <div className="relative w-full overflow-clip">
        <section className="title h-screen relative w-full">
          <h1 className="uppercase absolute text-[8vw] w-full text-center -bottom-[0.1em] leading-none right-[0.05em] tracking-widest text-transparent">
            Perseverance
          </h1>
        </section>
        <section className="cameras relative h-screen w-full top-0 left-0 opacity-100">
          <div className="absolute top-1/2 -translate-y-1/2 right-10 max-w-full w-md text-white">
            <h2 className="text-6xl mb-2">Cameras</h2>
            <p className="text-balance">
              Mounted on the &quot;head&quot; of the rover&apos;s long-necked
              mast. The SuperCam on the Perseverance rover examines rocks and
              soils with a camera, laser, and spectrometers to seek chemical
              materials that could be related to past life on Mars.
            </p>
          </div>
        </section>
        <section className="wheels relative h-screen w-full opacity-100">
          <div className="absolute bottom-10 left-16 max-w-full w-md text-white">
            <h2 className="text-6xl mb-2">Wheels</h2>
            <p className="text-balance">
              The wheels are made of aluminium, with cleats for traction and
              curved titanium spokes for springy support.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
