import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "variable",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className={montserrat.className}>{children}</section>;
}
