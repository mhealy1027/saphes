import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Saphes — Structured Data from Ancient Texts",
  description:
    "Saphes extracts structured, tabular data from ancient Greek and Latin texts. Built for classicists, historians, and researchers.",
  openGraph: {
    title: "Saphes",
    description: "AI-powered structured data extraction from ancient texts",
    siteName: "Saphes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "2rem 2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
            }}
          >
            Built by{" "}
            <a
              href="https://github.com/mhealy1027"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michael Healy
            </a>{" "}
            &nbsp;·&nbsp;{" "}
            <a
              href="https://substack.com/@mhealy1027"
              target="_blank"
              rel="noopener noreferrer"
            >
              Substack
            </a>{" "}
            &nbsp;·&nbsp;{" "}
            <a
              href="https://github.com/mhealy1027/saphes"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
            }}
          >
            Saphes is{" "}
            <a
              href="https://github.com/mhealy1027/saphes"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
