"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText)

export default function Page() {

  const containerRef = useRef<HTMLDivElement>(null)

  // useEffect(()=>{
  //   const ctx = gsap.context(()=>{

  //   gsap.from(".title", {opacity:0})
  //   gsap.to(".title", {
  //     x:200,
  //     duration:10,
  //     onUpdate: ()=>{
  //       console.log("update")
  //     }
  //   })
  //   gsap.fromTo(".title", {y:200},{y:-200})

  //   }, containerRef)

  //   return ()=>{
  //     ctx.revert()
  //   }
  // })

  useGSAP(()=>{
    
    const split = new SplitText(".title",{type:"chars, words", charsClass:"letter"})

    gsap.from(split.chars, {stagger:0.5})

    gsap.from(".title .letter", {
      opacity: 0,
      stagger: 0.05,
      ease: "circ.out"})

    gsap.to(".title", {
      x: 200,
      duration: 10,
      ease: "circ.out",
      onUpdate: ()=>{
        console.log("update")
      }
    })

    gsap.fromTo(".title", {y: 200},{y: -200})

  },{
    scope:containerRef
  })

  return (
    <div className="bg-blue-300 text-black">
      <div ref={containerRef} className="flex h-screen items-end justify-left overflow-hidden">
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          GSAP
          <br />
          tweens
        </h1>
      </div>
      <p className="title">Here</p>

    </div>
  );
}
