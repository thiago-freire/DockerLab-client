
'use server';
import 'server-only';

import { Node, ResponseDockerLab } from '@/app/types/objects';
import { APIURL } from "@/app/server/globals";

/**
 * Envia um objeto máquina para API
 * @param {Machine} node a ser enviada para a API
 * @type {Promisse<ResponseDockerLab>}
 * @returns Resposta da API 
 */
export async function sendNodetoAPI(node: Node){

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(node)
    };

    const url = `${APIURL}/node/create`;

    const backResponse = await fetch(url, requestOptions)
    .then(reponse => reponse.json())
    .catch(error => {
        return {'mensage': 'Erro ao enviar dados a API', 'status': false, 'error':error};
    });

    const response: ResponseDockerLab = {mensage: backResponse.mensage, status: backResponse.status, 
                                         error: backResponse.error}

    return response;

}