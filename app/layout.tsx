import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "SmartCompress",
  description: "Modern file compression tool",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
