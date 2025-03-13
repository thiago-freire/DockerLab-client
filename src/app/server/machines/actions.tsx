
'use server';
import 'server-only';

import { Machine, ResponseDockerLab } from '@/app/types/types';
import { APIURL } from "@/app/server/globals";

/**
 * Envia um objeto máquina para API
 * @param {Machine} machine a ser enviada para a API
 * @type {Promisse<ResponseDockerLab>}
 * @returns Resposta da API 
 */
export async function sendMachinetoAPI(machine: Machine){

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(machine)
    };

    const url = `${APIURL}/machine/create`;

    const backResponse = await fetch(url, requestOptions)
    .then(reponse => reponse.json())
    .catch(error => {
        return {'mensage': 'Erro ao enviar dados a API', 'status': false, 'error':error};
    });

    const response: ResponseDockerLab = {mensage: backResponse.mensage, status: backResponse.status, 
                                         error: backResponse.error}

    return response;

}