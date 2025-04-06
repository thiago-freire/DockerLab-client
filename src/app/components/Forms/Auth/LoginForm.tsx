
"use client";
import Link from 'next/link';
import { FieldValues, useForm } from "react-hook-form"; 
import { SubmitButton } from "@/app/components/Buttons/Login/loginButton";
import styles from "@/app/components/Forms/Auth/LoginForm.module.css";
import { LoginFormSchema } from '@/app/functions/login/definitions';
import { getDataFromResult } from '@/app/functions/login/actions';
import type { ErrorType } from "@/app/types/objects"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

export function LoginForm() {

    const { register, handleSubmit } = useForm();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<ErrorType>();
    const route = useRouter();

    const login_func = async (setData: FieldValues) =>{
        
        const login = setData.login;

        const password = setData.password;

        startTransition(async () =>{
            // Validação dos campos do formulário de signup
            const validationResult = LoginFormSchema.safeParse({
                login: login,
                password: password,
            });
            
            if (!validationResult.success){
                let messageArray: Array<string> =  []
                const messages = validationResult.error.flatten().fieldErrors;
                for (const key in messages.login) {
                    // Verifica se a chave existe no objeto de erros
                    if (messages.hasOwnProperty(key)) {
                      // Concatena as mensagens para a chave específica
                      messageArray = messageArray.concat(key);
                    }
                }
                for (const key in messages.password) {
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
                    login: user.login,
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
                
            }catch(error){
                console.error("Authentication error:", error);
                // switch (error.type) {
                //     case "CredentialsSignin":
                //         setError({message: ["E-mail ou senha inválidos."], type: error.type});
                //     default:
                //         console.log(error.message);
                //         setError({message: [`Servidor Offline.`], type: error.type});
                // }
                return;
            }

            route.push('/home/users');
        });
    };
    
    //JSX
    return (<div className={styles.conteiner}>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={handleSubmit(login_func)} className={styles.form}>
                    <div className={styles.wrapperEmailInput}>
                        <label className={styles.textInput}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575.616 575.616" className={styles._svg}>
                                <path d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439    c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499    c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081    S181.727,202.994,181.727,144.499z"/>
                                <path d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919    V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982    c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742    C81.319,310.758,45.049,346.991,45.049,391.68z"/>
                            </svg>
                            <input {...register("login")}
                                    type='text'
                                    id="login"
                                    name='login'
                                    className="bg-white text-primary" 
                                    placeholder="Digite seu email" 
                                    autoComplete='email'/>
                        </label>
                        {/* {hasErrorFeedbackEmail(state)} */}
                    </div>
                    <div className={styles.wrapperPasswordInput}>
                        <label className={styles.textInput}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                className={styles._svg}>
                                <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                            </svg>
                            <input {...register("password")}
                                    id="password"
                                    type="password"
                                    name="password"
                                    className='bg-white text-primary'
                                    placeholder='Digite sua senha'
                                    autoComplete='current-password'/>
                        </label>
                        {/* {hasErrorFeedbackPassword(state)} */}
                        <Link href='#' className={styles.linkSecundary}>Esqueceu a senha?</Link>
                    </div>
                    <SubmitButton isPending = {isPending}/>
                    {error && hasMessage(error)}
                </form>
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