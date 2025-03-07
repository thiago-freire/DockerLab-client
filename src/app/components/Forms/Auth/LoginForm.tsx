
"use client";
import Link from 'next/link';
import { Field, FieldValues, useForm } from "react-hook-form"; 
import { SubmitButton } from "../../Buttons/Login/loginButton";
import { EmailIcon, PasswordIcon } from '../../Icons/Login/icons'
import styles from "@/app/components/Forms/Auth/LoginForm.module.css";
import { LoginFormSchema } from '../../../functions/login/definitions';
import { getDataFromResult } from '../../../functions/login/actions';
import type { LoginData, ErrorType } from "../../../types/types"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { GoogleBtn } from '../../Buttons/Login/GoogleButton';

export function LoginForm() {

    const { register, handleSubmit } = useForm();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<ErrorType>();
    const route = useRouter();

    const login = async (setData: FieldValues) =>{
        
        const email = setData.email;

        const password = setData.password;

        startTransition(async () =>{
            // Validação dos campos do formulário de signup
            const validationResult = LoginFormSchema.safeParse({
                email: email,
                password: password,
            });
            
            if (!validationResult.success){
                let messageArray: Array<string> =  []
                const messages = validationResult.error.flatten().fieldErrors;
                for (let key in messages.email) {
                    // Verifica se a chave existe no objeto de erros
                    if (messages.hasOwnProperty(key)) {
                      // Concatena as mensagens para a chave específica
                      messageArray = messageArray.concat(key);
                    }
                }
                for (let key in messages.password) {
                    // Verifica se a chave existe no objeto de erros
                    if (messages.hasOwnProperty(key)) {
                      // Concatena as mensagens para a chave específica
                      messageArray = messageArray.concat(key);
                    }
                }
                setError({ message: messageArray, type: "Common"})
                return
            }

            // Autentica o usuario na API
            const user = await getDataFromResult(validationResult);

            try{
                const res = await signIn('credentials', {
                    email: user.email,
                    password: user.password,
                    redirect: false,
                })

                if (!res) {
                    setError({message: ["Sem resposta!"], type: "Outros"});
                    return
                }

                if (!res.ok){
                    if (res.error == "CredentialsSignin")
                        setError({message: ["E-mail ou senha inválidos."], type: res.error});
                    else
                        setError({message: [`Servidor Offline.`], type: "res.error"});
                    return
                }
                
            }catch(error: any){
                console.error("Authentication error:", error);
                switch (error.type) {
                    case "CredentialsSignin":
                        setError({message: ["E-mail ou senha inválidos."], type: error.type});
                    default:
                        console.log(error.message);
                        setError({message: [`Servidor Offline.`], type: error.type});
                }
                return;
            }

            route.push('/home');
        });
    };
    
    //JSX
    return (<div className='artboard phone-1 bg-white flex flex-col items-center rounded-xl py-16'>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={handleSubmit(login)} className={styles.form}>
                    <div className={styles.wrapperEmailInput}>
                        <label className={styles.textInput}>
                            <EmailIcon />
                            <input {...register("email")}
                                    type='email'
                                    id="email"
                                    name='email'
                                    className="bg-white" 
                                    placeholder="Digite seu email" 
                                    autoComplete='email'/>
                        </label>
                        {/* {hasErrorFeedbackEmail(state)} */}
                    </div>
                    <div className={styles.wrapperPasswordInput}>
                        <label className={styles.textInput}>
                            <PasswordIcon />
                            <input {...register("password")}
                                    id="password"
                                    type="password"
                                    name="password"
                                    className=''
                                    placeholder='Digite sua senha'
                                    autoComplete='current-password'/>
                        </label>
                        {/* {hasErrorFeedbackPassword(state)} */}
                        <Link href='#' className="opacity-50 pointer-events-none ">Esqueceu a senha?</Link>
                    </div>
                    <SubmitButton isPending = {isPending}/>
                    {error && hasMessage(error)}
                </form>
                <p className='p-5 text-blue-600 font-bold'>ou</p>
                <GoogleBtn/>
                {/* <Link href='/signup' className={styles.linkSecundary}>Cadastrar-se</Link> */}
            </div>)
}

function hasMessage(state: ErrorType) {
    
    if (state.message.length > 0) {
        
        return (
            <div className='text-error mt-2 text-center'>
                {state.message.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        );
    }

    return null; 
}