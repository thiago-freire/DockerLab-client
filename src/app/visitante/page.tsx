"use client";

import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Page(){

    const router = useRouter();

    const [content, setContent] = useState<React.ReactNode>(<div>Nothing</div>);

    useEffect(() =>{

        const verifySession = async () => {
            return await getSession();
        }

        verifySession().then((session)=>{
            if (!session) {
                router.push("/login", {scroll: false});
            }else{
                const urlImage = session.user?.image!;

                setContent(<div className="flex flex-col p-20 items-center">
                                <div>Olá, {session.user?.name}! Você é visitante!</div>
                                <div>Email: {session.user?.email}</div>
                                <Image src={urlImage} alt="Foto" width={96} height={96} className="p-2 rounded-md"/>
                                <button onClick={() => signOut()}>Sign out</button>
                            </div>);
            }
        });
        
    },[]);

    return content;
}