import { Doto } from "next/font/google";

const doto = Doto({
  subsets: ["latin"],
  weight: "variable",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className={doto.className}>{children}</section>;
}
