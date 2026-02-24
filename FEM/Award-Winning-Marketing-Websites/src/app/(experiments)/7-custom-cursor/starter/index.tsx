"use client";

import s from "./styles.module.css";

export default function Page() {
  return (
    <div className="w-screen h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 className="uppercase text-[10vh] leading-none relative cursor-default pl-[0.1em] opacity-60 hover:opacity-100">
        Start
      </h1>
      <div className={s.cursor} />
    </div>
  );
}
