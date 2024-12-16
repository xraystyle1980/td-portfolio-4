import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: "Your Site",
  description: "Interactive portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
