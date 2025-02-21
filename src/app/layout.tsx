"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from 'sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light"> 
            {children}
            <Toaster></Toaster>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
