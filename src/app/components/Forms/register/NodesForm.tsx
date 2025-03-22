"use client";

import styles from "@/app/components/Forms/register/nodes.module.css";
import { FieldValues, useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { ErrorType, Node } from "@/app/types/objects";
import { sendNodetoAPI } from "@/app/server/nodes/actions";

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

export function NodesForm() {

    const { register, handleSubmit } = useForm();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<ErrorType>();

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    function machiRegister(setData: FieldValues){

        const nome = setData.nome;

        const maquina = setData.maquina;

        const usuario = setData.usuario;

        const cores = setData.cores;

        const ram = setData.ram;

        const device = setData.device;

        const network = setData.network;

        startTransition(async () =>{
            
            const node: Node = {nome: nome, maquina: maquina, usuario: usuario, 
                                   cores: cores, ram:ram, device: device, network: network};
            // Autentica o usuario na API
            const response = await sendNodetoAPI(node);

            if(!response.status){
                const error: ErrorType = {message: [response.mensage], type: response.error!}
                setError(error);
            }

            console.log(response.mensage);
            console.log(response.status);
            console.log(response.error);

            await delay(5000);

        });
    }

    
     //JSX
    return (<div className={styles.conteiner}>
                <form onSubmit={handleSubmit(machiRegister)} className={styles.form}>
                    <div className="flex">
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Nome: </span>
                                <input {...register("nome")} type="text" className={styles.input_text} required placeholder="CP-Vision-004" />
                            </label>
                            <p className="validator-hint">Campo obrigatório.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Maquina: </span>
                                <select {...register("maquina")} className={styles.input_text} required>
                                    <option disabled>Selecione...</option>
                                    <option value={1}>SRV-VIPLAB1</option>
                                    <option value={2}>SRV-VIPLAB2</option>
                                    <option value={3}>SRV-VIPLAB3</option>
                                    <option value={4}>SRV-VIPLAB5</option>
                                </select>
                            </label>
                            <p className="validator-hint">Escolha uma opção.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Usuário: </span>
                                <select {...register("usuario")} className={styles.input_text} required>
                                <option disabled>Selecione...</option>
                                    <option value={1}>Marcos</option>
                                    <option value={2}>Caio</option>
                                    <option value={3}>Gabriel</option>
                                    <option value={4}>Lucas</option>
                                    <option value={5}>Thiago Paiva Freire</option>
                                </select>
                            </label>
                            <p className="validator-hint">Escolha uma opção.</p>
                        </div>
                    </div>

                    <div className="flex">
                    <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Cores: </span>
                                <div className="w-full max-w-xs">
                                    <select {...register("cores")} className={styles.input_text} required>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                    </select>
                                </div>
                            </label>
                            <p className="validator-hint">Escolha uma opção.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">RAM: </span>
                                <input {...register("ram")} type="text" className={styles.input_text} required pattern="[0-9]+" max={4} placeholder="12" />
                                <span className="label">GB</span>
                            </label>
                            <p className="validator-hint">Digite um valor numérico.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">GPU: </span>
                                <select {...register("device")} className={styles.input_text} required>
                                <option disabled>Selecione...</option>
                                    <option value={1}>RTX 3060 (device 0)</option>
                                    <option value={2}>RTX 3060 (device 1)</option>
                                </select>
                            </label>
                            <p className="validator-hint">Escolha uma opção.</p>
                        </div>
                        <div className="mx-4">
                            <label className="input validator">
                                <span className="label">Network: </span>
                                <select {...register("device")} className={styles.input_text} required>
                                <option disabled>Selecione...</option>
                                    <option value={1}>Bridge</option>
                                    <option value={2}>Host</option>
                                    <option value={3}>Overlay</option>
                                </select>
                            </label>
                            <p className="validator-hint">Escolha uma opção.</p>
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