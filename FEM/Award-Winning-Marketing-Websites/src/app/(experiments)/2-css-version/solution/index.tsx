import s from "./styles.module.css";

const text = ["CSS".split(""), "version".split("")];

export default function Page() {
  return (
    <div className="bg-blue-300 text-black">
      <div className="bg-blue-300 text-black flex h-screen items-end justify-left overflow-hidden">
        <h1 className="title font-black text-[min(20rem,30vw)] leading-none pb-[0.1em] text-left">
          {text[0].map((letter, i) => (
            <span
              key={i}
              className={s.letter}
              style={
                {
                  "--index": i,
                } as React.CSSProperties
              }
            >
              {letter}
            </span>
          ))}
          <br />
          {text[1].map((letter, i) => (
            <span
              key={i}
              className={s.letter}
              style={
                {
                  "--index": i + text[0].length,
                } as React.CSSProperties
              }
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
