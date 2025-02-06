import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "@styles";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interface",
  description: "Interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
