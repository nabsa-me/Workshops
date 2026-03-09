"use client";

import { PointerEventHandler, useCallback, useEffect, useRef, useState } from "react";
import s from "./styles.module.css";
import { lerp } from "@/lib/math";
import gsap from "gsap";

export default function Page() {

  const mouseRef = useRef<HTMLDivElement>(null)

  const cursorPosRef = useRef({x: 0, y: 0})
  // const cursorPosRef = {
  //   current: {
  //     x: 0,
  //     y: 0
  //   }
  // }

  const cursorTargetRef = useRef({x: 0, y: 0})

  const [snap, setSnap] = useState<null | {x: number, y: number, w: number, h: number}>(null)

  useEffect(() => {
    const callback : gsap.TickerCallback = (time, deltaTime) =>{
      if(snap){

        cursorPosRef.current.x = lerp(cursorPosRef.current.x, snap.x, 0.01 * deltaTime);
        cursorPosRef.current.y = lerp(cursorPosRef.current.y, snap.y, 0.01 * deltaTime);

        if (mouseRef.current){
          mouseRef.current.style.setProperty("--x", cursorPosRef.current.x.toString()+"px")
          mouseRef.current.style.setProperty("--y", cursorPosRef.current.y.toString()+"px")
        }

      } else {
        cursorPosRef.current.x = lerp(cursorPosRef.current.x, cursorTargetRef.current.x, 0.01 * deltaTime);
        cursorPosRef.current.y = lerp(cursorPosRef.current.y, cursorTargetRef.current.y, 0.01 * deltaTime);

        if (mouseRef.current){
          mouseRef.current.style.setProperty("--x", cursorPosRef.current.x.toString()+"px")
          mouseRef.current.style.setProperty("--y", cursorPosRef.current.y.toString()+"px")
        }
      }
    };
    
    const cb = gsap.ticker.add(callback)

    return () => {
      gsap.ticker.remove(cb)
    }
  },[snap])

  const onPointerEnter = useCallback<PointerEventHandler<HTMLHeadingElement>>((event)=>{
    const rect = event.currentTarget.getClientRects()[0]

    setSnap({x:window.innerWidth / 2, y:window.innerHeight / 2, w:rect.width + 10, h:rect.height + 10})
  },[])

  const onPointerLeave = useCallback(()=>{
    setSnap(null)
  },[])

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("mousemove", (event) => {
      const x = event.clientX
      const y = event.clientY

      if(mouseRef.current){

        cursorTargetRef.current.x = x
        cursorTargetRef.current.y = y
        }
      }
    )

    return ()=>{controller.abort()}
  },[])

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100">
        Start
      </h1>
      <div className={s.cursor} ref={mouseRef} style= {{
        "--w": snap ? snap.w+"px" : undefined,
        "--h": snap ? snap.h+"px" : undefined
        } as React.CSSProperties}/>
    </div>
  );
}
