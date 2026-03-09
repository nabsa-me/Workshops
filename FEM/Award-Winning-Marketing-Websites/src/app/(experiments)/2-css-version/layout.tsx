import { Antonio } from "next/font/google";

const antonio = Antonio({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={antonio.className}>{children}</div>;
}
