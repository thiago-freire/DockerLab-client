"use client"

import HeaderMenu from "@/app/components/Header/TopHeaderNavigation";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
      <>
        <HeaderMenu/>
        <div className="flex items-start justify-center">
          {children}
        </div>
      </>
  );
}
