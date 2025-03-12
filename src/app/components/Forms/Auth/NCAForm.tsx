
"use client";
import styles from "@/app/components/Forms/Auth/NCAForm.module.css";
import { GoogleBtn } from '@/app/components/Buttons/Login/GoogleButton';
import Image from "next/image";

export function NCAForm() {

    //JSX
    return (<div className={styles.conteiner}>
                <div className="flex flex-col items-center justify-center">
                    <Image src='assets/docker_logo.png' alt="Docker Lab" width={233} height={60} className="mb-9"/>
                    <div>Login com</div>
                    <GoogleBtn/>
                </div>
            </div>)
}