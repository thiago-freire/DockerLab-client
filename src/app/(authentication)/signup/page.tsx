"use client"
// import { SignupForm } from "@/app/components/Forms/Auth/SignupForm";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Signup(){

    const router = useRouter();

    const [content, setContent] = useState<React.ReactNode>(null);

    useEffect(() =>{
    
        const verifySession = async () => {
        
                    return await getSession();
                }
        
                verifySession().then((session)=>{
                    if (session) {
                        router.push("/home", { scroll: false });
                    }else{
                        setContent(<div className='bg-login bg-cover bg-center flex justify-center items-center min-h-screen'>
                                        {/* <SignupForm />  */}
                                    </div>);
                    }
                });
        
    },[router]);
    
    return content;
}