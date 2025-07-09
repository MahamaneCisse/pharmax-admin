import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Pharmax",
  description: "Gerer votre pharmacie en ligne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
