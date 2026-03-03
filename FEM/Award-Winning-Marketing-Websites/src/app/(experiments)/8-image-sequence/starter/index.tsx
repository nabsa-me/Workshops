"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { fitContent, remap } from "@/lib/math";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0)

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      })

      tl.to(progressRef, {
        current: 0.35,
        duration: 0.3
      })

      tl.to(".title", {
        autoAlpha: 0,
        duration: 0.05
      }, 0.05)

      tl.to(".cameras", {
        autoAlpha: 1,
        duration: 0.1
      }, "-=0.2s")

      tl.to(".cameras", {
        delay: 0.1,
        autoAlpha: 0,
        duration: 0.1
      }, "-=0.2s")

      tl.to(progressRef, {
        current: 1,
        duration: 0.4
      })

      tl.to(".wheels", {
        autoAlpha: 1,
        duration: 0.05
      }, "-=0.1")
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="h-[400vh]">
      <ScrollSequence progress={progressRef}/>
      <div className="relative w-full overflow-clip">
        <section className="title h-screen fixed w-full">
          <h1 className="uppercase absolute text-[8vw] w-full text-center -bottom-[0.1em] leading-none right-[0.05em] tracking-widest text-transparent">
            Perseverance
          </h1>
        </section>
        <section className="cameras fixed h-screen w-full top-0 left-0 opacity-0">
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
        <section className="wheels fixed h-screen w-full opacity-0">
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

function ScrollSequence ({progress}:{progress:React.RefObject<number>}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect (()=>{
    const canvas = canvasRef.current
    if(!canvas)return

    const ctx = canvas.getContext("2d")
    if(!ctx)return 

    function resize (){
      if(!canvas)return 
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize ()
    window.addEventListener("resize", resize)

    const img = new Image()
    img.src="/sequence/0001.webp"

    const images: Record<number,HTMLImageElement> = {}

    for (let index = 1; index < 301; index ++){
      const img = new Image()
      img.src=`/sequence/${index.toString().padStart(4, "0")}.webp`
      img.onload=()=>{
        images[index]= img
      }
    }

    gsap.ticker.add(()=>{
      if(!canvas || !ctx) return

      let frameNumber = remap(progress.current, 0, 1, 1, 300)
      frameNumber = Math.round(frameNumber)

      const img = images[frameNumber]

      if (!img)return 

      const {x, y, width, height} = fitContent(canvas.offsetWidth, canvas.offsetHeight, img.width, img.height)

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight )
      ctx.drawImage(img, x, y, width, height)

    })
  },[progress])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 w-full h-full"/>
  )
}
