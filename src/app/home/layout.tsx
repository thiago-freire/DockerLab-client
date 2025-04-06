"use client"

import HeaderMenu from "@/app/components/Header/TopHeaderNavigation";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
      <SessionProvider>
        <HeaderMenu/>
        <div className="flex items-start justify-center bg-sky-300">
          {children}
        </div>
      </SessionProvider>
  );
}
