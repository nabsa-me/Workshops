import s from "./style.module.css"
const text = [
  "CSS".split(""),
  "version".split("")
]

export default function Page() {
  return (
    <div className="bg-blue-300 text-black">
      <div className="flex h-screen items-end justify-left overflow-hidden">
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          {text[0].map((letter,idx)=><span 
            className={s.letter} 
            key={letter+idx}
            style={{
              "--index":idx
            } as React.CSSProperties}>
              {letter}
            </span>)}
          <br />
          {text[1].map((letter,idx)=><span 
            className={s.letter} 
            key={letter+idx}
            style={{
              "--index":idx
            } as React.CSSProperties}>
              {letter}
            </span>)}
        </h1>
      </div>
    </div>
  );
}
