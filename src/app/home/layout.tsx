"use client"

import HeaderMenu from "@/app/components/Header/TopHeaderNavigation";
import { Session } from "next-auth";
import { SessionProvider, getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  // const [session, setSession] = useState<Session>();
  
  // useEffect(() =>{

  //   const verifySession = async () => {
  //     const session = await getSession();
  //     if(session && session.user)
  //       console.log(session.user);
  //     return session;
  //   }

  //   verifySession().then((session)=>{
  //       if (session) {
  //           setSession(session);
  //       }
  //   });
    
  // },[]); session={session}



  return (
      <SessionProvider>
        <HeaderMenu/>
        <div className="flex items-start justify-center bg-sky-300">
          {children}
        </div>
      </SessionProvider>
  );
}
