"use client";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Sidebar } from "./_components/sideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system"> 
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 p-4">{children}</div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

