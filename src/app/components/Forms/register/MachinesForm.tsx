"use client";

import styles from "@/app/components/Forms/register/machines.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { ErrorType, Machine } from "@/app/types/types";
import { sendMachinetoAPI } from "@/app/server/machines/actions";

function SubmitButton(invar: {isPending: boolean}) {

    return (
        <button disabled={invar.isPending} type='submit' className={styles.submit_button}>
            { invar.isPending ? <div className={styles.innerDiv}>
                            <span className={styles.loading_button}/>
                            Registrando...
                        </div> : 'Registrar'}
        </button>
    );
}

export function MachinesForm() {

    const { register, handleSubmit } = useForm();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<ErrorType>();

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function machiRegister(setData: FieldValues){

        const nome = setData.nome;

        const ip = setData.ip;

        const porta = setData.porta;

        const login = setData.login;

        const senha = setData.senha;

        startTransition(async () =>{
            
            const machine: Machine = {nome: nome, ip: ip, porta: porta, login: login, senha:senha};
            // Autentica o usuario na API
            const response = await sendMachinetoAPI(machine);

            console.log(response.mensage);
            console.log(response.status);
            console.log(response.error);

            await delay(5000);

        });
    }

    
//     //JSX
    return (<div className={styles.conteiner}>
                <form onSubmit={handleSubmit(machiRegister)} className={styles.form}>
                    <div className="flex">
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Hostname: </span>
                                <input {...register("nome")} type="text" className={styles.input_text} required placeholder="SRV-VIPLAB4" />
                            </label>
                            <p className="validator-hint">Campo obrigatório.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Host IP: </span>
                                <input {...register("ip")} type="text" className={styles.input_text} required pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$" placeholder="192.168.200.1" />
                                {/*  */}
                            </label>
                            <p className="validator-hint">Deve ser um endereço de ip válido.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Porta SSH: </span>
                                <input {...register("porta")} type="text" className={styles.input_text} required pattern="[0-9]+" placeholder="22" />
                            </label>
                            <p className="validator-hint">Deve ser um número de porta.</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="mx-4">
                            <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                                <input {...register("login")} type="text" className={styles.input_text} minLength={3} maxLength={30} required placeholder="viplab" />
                            </label>
                            <p className="validator-hint">Campo obrigatório.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                                <input {...register("senha")} type="password" className={styles.input_text} required/>
                            </label>
                            <p className="validator-hint">Campo obrigatório.</p>
                        </div>
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