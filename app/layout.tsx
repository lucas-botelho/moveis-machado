import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Móveis Machado | Mobiliário por medida",
  description:
    "Fabrico próprio de cozinhas e mobiliário por medida em Odivelas e Lisboa.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale =
    (await headers()).get("x-site-locale") === "en" ? "en" : "pt-PT";
  return (
    <html lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
