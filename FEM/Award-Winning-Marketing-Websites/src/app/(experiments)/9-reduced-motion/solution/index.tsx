"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { fitContent, remap } from "@/lib/math";

import heroImage from "./assets/0001.webp";
import cameraImage from "./assets/0130.webp";
import wheelsImage from "./assets/0300.webp";
import NextImage from "next/image";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange() {
      setReducedMotion(query.matches);
    }

    handleChange();

    query.addEventListener("change", handleChange);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef<number>(0);

  useGSAP(
    () => {
      SplitText.create("h1", {
        type: "chars",
        charsClass:
          "char++ bg-linear-to-t from-black/10 to-white to-70% bg-clip-text",
        mask: "chars",
      });

      if (reducedMotion) {
        gsap.from("section.title", {
          autoAlpha: 0,
        });
        return;
      }

      gsap.from("h1 .char", {
        x: "100%",
        rotateY: "90deg",
        stagger: 0.02,
        duration: 0.5,
        ease: "circ.out",
      });

      gsap
        .timeline({
          ease: "linear",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        })
        .to(progress, {
          current: 0.4,
          duration: 0.4,
        })
        .to(
          "h1",
          {
            opacity: 0,
            duration: 0.1,
          },
          "<+0.01"
        )
        .to(".cameras", {
          opacity: 1,
          repeat: 1,
          yoyo: true,
          duration: 0.1,
          repeatDelay: 0.2,
        })
        .to(progress, {
          duration: 0.8,
          current: 1,
        })
        .to(
          ".wheels",
          {
            opacity: 1,
            duration: 0.2,
          },
          "-=0.2"
        );
    },
    { scope: containerRef, dependencies: [reducedMotion], revertOnUpdate: true }
  );

  return (
    <div
      ref={containerRef}
      className="motion-safe:h-[400vh] motion-reduce:bg-black"
    >
      {!reducedMotion && <ImageSequence progress={progress} />}
      <div className="relative w-full overflow-clip motion-safe:h-screen">
        <section className="title h-screen fixed w-full motion-reduce:relative">
          <NextImage
            src={heroImage}
            alt="Perseverance rover"
            className="absolute top-0 left-0 w-full h-full object-cover motion-safe:hidden"
          />
          <h1 className="uppercase absolute text-[8vw] w-full text-center -bottom-[0.1em] leading-none right-[0.05em] tracking-widest text-transparent">
            Perseverance
          </h1>
        </section>
        <section className="cameras fixed h-screen w-full top-0 left-0 motion-safe:opacity-0 motion-reduce:relative">
          <NextImage
            src={cameraImage}
            alt="Perseverance rover cameras"
            className="absolute top-0 left-0 w-full h-full object-cover motion-safe:hidden"
          />
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
        <section className="wheels fixed h-screen w-full motion-safe:opacity-0 motion-reduce:relative">
          <NextImage
            src={wheelsImage}
            alt="Perseverance rover wheels"
            className="absolute top-0 left-0 w-full h-full object-cover motion-safe:hidden"
          />
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

function ImageSequence({ progress }: { progress: React.RefObject<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ctx = canvas.getContext("2d");

    const images: Record<number, HTMLImageElement> = {};

    for (let index = 0; index < 300; index++) {
      const img = new Image();
      const imageNumber = (index + 1).toString().padStart(4, "0");
      img.src = `/sequence/${imageNumber}.webp`;

      img.onload = () => {
        images[index + 1] = img;
      };
    }

    function drawImage() {
      if (!canvas || !ctx) return;

      let frame = remap(progress.current, 0, 1, 1, 300);
      frame = Math.round(frame);

      const imageToRender = images[frame];

      if (!imageToRender) return;

      const { x, y, width, height } = fitContent(
        canvas.width,
        canvas.height,
        imageToRender.width,
        imageToRender.height
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageToRender, x, y, width, height);
    }

    const cb = gsap.ticker.add(drawImage);

    return () => {
      gsap.ticker.remove(cb);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [progress]);

  return (
    <canvas ref={canvasRef} className="fixed w-screen h-screen top-0 left-0" />
  );
}
