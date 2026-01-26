import "./globals.css";

export const metadata = {
  title: "SmartCompress",
  description: "Modern file compression tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
