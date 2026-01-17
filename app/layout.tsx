import type { Metadata } from "next";
import { Schibsted_Grotesk , Martian_Mono} from "next/font/google";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Events App",
  description: "Event-Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-dvh antialiased`}
      > 
      <header>
        <h1>
          Events App
        </h1>
      </header>
        {children}
      </body>
    </html>
  );
}
