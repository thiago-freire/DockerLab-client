"use client"
import { SignupForm } from "@/app/components/Forms/auth/SignupForm";

export default function ErrorBoundary() {
    return (
        <>
            <SignupForm />  
            <p className='text-error'>Não foi possível enviar os dados. Tente mais tarde.</p>
        </>
    )
}