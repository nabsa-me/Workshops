"use client";

import s from "./styles.module.css";
import {
  PointerEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { lerp } from "@/lib/math";
import gsap from "gsap";

export default function Page() {
  const cursorRef = useRef<HTMLDivElement>(null);

  const cursorTargetRef = useRef({
    x: 0,
    y: 0,
  });

  const cursorPositionRef = useRef({
    x: 0,
    y: 0,
  });

  const [snap, setSnap] = useState<null | {
    x: number;
    y: number;
    w: number;
    h: number;
  }>(null);

  useEffect(() => {
    const cb = gsap.ticker.add((time, delta) => {
      if (!cursorRef.current) return;
      const cursorTarget = cursorTargetRef.current;
      const cursorPosition = cursorPositionRef.current;

      if (snap) {
        cursorPosition.x = lerp(cursorPosition.x, snap.x, 0.01 * delta);
        cursorPosition.y = lerp(cursorPosition.y, snap.y, 0.01 * delta);
      } else {
        cursorPosition.x = lerp(cursorPosition.x, cursorTarget.x, 0.01 * delta);
        cursorPosition.y = lerp(cursorPosition.y, cursorTarget.y, 0.01 * delta);
      }

      cursorPosition.x = Math.round(cursorPosition.x * 100) / 100;
      cursorPosition.y = Math.round(cursorPosition.y * 100) / 100;

      cursorRef.current.style.setProperty("--x", cursorPosition.x + "vw");
      cursorRef.current.style.setProperty("--y", cursorPosition.y + "vh");
    });

    return () => {
      gsap.ticker.remove(cb);
    };
  }, [snap]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const controller = new AbortController();

    const cursorTarget = cursorTargetRef.current;

    window.addEventListener(
      "mousemove",
      (event) => {
        if (!cursorRef.current) return;

        const { innerWidth, innerHeight } = window;

        cursorTarget.x = (event.clientX * 100) / innerWidth;
        cursorTarget.y = (event.clientY * 100) / innerHeight;
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  const onPointerEnterCb = useCallback<PointerEventHandler<HTMLHeadingElement>>(
    (event) => {
      const rect = event.currentTarget.getClientRects()[0];
      setSnap({
        x: 50,
        y: 50,
        w: rect.width + 20,
        h: rect.height + 10,
      });
    },
    []
  );

  const onPointerLeaveCb = useCallback(() => {
    setSnap(null);
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1
        onPointerEnter={onPointerEnterCb}
        onPointerLeave={onPointerLeaveCb}
        className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100"
      >
        Start
      </h1>

      <div
        ref={cursorRef}
        className={s.cursor}
        style={
          {
            "--w": snap ? snap.w + "px" : undefined,
            "--h": snap ? snap.h + "px" : undefined,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
