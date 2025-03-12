"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleBtn(){

    function login(){
        signIn("google", {callbackUrl: "/home/viplab"});
    }

    return  <button onClick={login} className="flex btn bg-white btn-outline gap-2 items-center border border-neutral-900 p-2 rounded-md h-24">
                <Image src="/assets/nca_google_2.png" alt="Login" width={180} height={80}/>
            </button>
}
