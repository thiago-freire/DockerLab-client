"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { LoginForm } from "@/app/components/Forms/Auth/LoginForm";

export default function Login(){

    const router = useRouter();

    const [content, setContent] = useState<React.ReactNode>(null);

    useEffect(() =>{

        const verifySession = async () => {

            return await getSession();
        }

        verifySession().then((session)=>{
            if (session) {
                router.push("/home/viplab", { scroll: false });
            }else{
                setContent(<div className="flex bg-cover bg-center bg-docker_image min-h-screen justify-end">
                                <div className="flex justify-center align-middle">
                                    <LoginForm/>
                                </div>
                            </div>);
            }
        });
        
    },[router]);

    return content;
}