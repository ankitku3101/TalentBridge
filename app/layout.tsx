import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  variable:'--font-montserrat',
  weight:['400','600','700'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "Talent Bridge",
  description: "Connecting students, employers and universities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Providers>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
