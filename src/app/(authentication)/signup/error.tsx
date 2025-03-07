import { SignupForm } from "@/app/components/Forms/Auth/SignupForm";

export default function ErrorBoundary() {
    return (
        <>
            <SignupForm />  
            <p className='text-error'>"Não foi possível enviar os dados. Tente mais tarde."</p>
        </>
    )
}