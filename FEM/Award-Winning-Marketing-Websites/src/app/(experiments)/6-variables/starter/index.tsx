"use client";

import { cn } from "@/lib/utils";
import s from "./styles.module.css";

export default function Page() {
  return (
    <div
      className={cn(
        "w-screen h-screen text-white flex items-center justify-center",
        s.grid
      )}
    >
      <h1
        className={cn(
          "uppercase text-[10vh] leading-none relative",
          s["title"]
        )}
      >
        Variables
      </h1>
    </div>
  );
}
