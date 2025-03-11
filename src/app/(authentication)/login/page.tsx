"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { LoginForm } from "@/app/components/Forms/Auth/LoginForm"

export default function Login(){

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
                setContent(<div className="flex flex-col items-center justify-center my-8">
                                <LoginForm/>
                            </div>);
            }
        });
        
    },[]);

    return content;
}