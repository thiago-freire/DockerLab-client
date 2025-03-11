"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleBtn(){

    function login(){
        signIn("google", {callbackUrl: "/home"});
    }

    return  <button onClick={login} className="flex btn bg-white btn-outline gap-2 items-center border border-neutral-900 p-2 rounded-md">
                <Image src="/assets/google.png" alt="" width={96} height={32}/>
            </button>
}
