import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";



const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adrift | A True Story of Survival and Faith",
  description: "Adrift is a deeply personal memoir of transformation, revealing how moments of crisis, chance encounters, and unseen guidance shaped one man's life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-transparent text-mist font-serif antialiased selection:bg-gold selection:text-abyss min-h-screen">
        <main className="w-full relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
