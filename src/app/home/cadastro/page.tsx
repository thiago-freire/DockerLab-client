"use client"
import { SignupForm } from "@/app/components/Forms/Auth/SignupForm";
import styles from "@/app/home/home.module.css"

export default function Page(){
    
    return  <div className={styles.signup_conteiner}>
                <SignupForm /> 
            </div>;
}