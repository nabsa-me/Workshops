import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={orbitron.className}>{children}</div>;
}
