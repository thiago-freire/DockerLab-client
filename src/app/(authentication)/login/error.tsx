"use client";
import { LoginForm } from "@/app/components/Forms/Auth/LoginForm";

export default function ErrorBoundary() {

    return (
        <>
            <LoginForm />
            <p className="text-error">Não foi autenticar os dados. Tente novamente mais tarde.</p>
        </>
    )
}