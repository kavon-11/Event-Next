import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";

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

        <div className="absolute inset-0 top-0 z-[-10] ">
          <LightRays
            raysOrigin="top-center"
            raysColor="#5dfeca"
            followMouse={true}
            raysSpeed={3}
            lightSpread={2}
            fadeDistance={2}
            saturation={1.3}
            mouseInfluence={0.2}
            noiseAmount={0.15}
            className="custom-rays"
          />
        </div>
        <NavBar />
        <main className="mt-24 md:mt-0 md:ml-20 px-4 md:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
