
'use server';
import 'server-only';

import { Machine, ResponseDockerLab, FullMachine } from '@/app/types/types';
import { APIURL } from "@/app/server/globals";
import { RequestBuilder } from '../requests/builder';

/**
 * Envia um objeto máquina para API
 * @param {Machine} machine a ser enviada para a API
 * @type {Promisse<ResponseDockerLab>}
 * @returns Resposta da API 
 */
export async function sendMachinetoAPI(machine: Omit<Machine, 'id' | 'status' | 'create_date'>){

    const requestOptions = new RequestBuilder()
    .setMethod('POST')
    .setContentType("application/json")
    .setBody(machine)
    .build();

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

/**
 * Envia um objeto máquina para API
 * @type {Promisse<Array<Machine>>}
 * @returns Resposta da API 
 */
export async function getMachineList(){

    const url = `${APIURL}/machine/list`;

    const backResponse = await fetch(url)
    .then(reponse => reponse.json())
    .catch(error => {
        return {'mensage': 'Erro ao enviar dados a API', 'status': false, 'error':error};
    });

    // console.log(backResponse);
    if(!backResponse.status){
        const lista : Array<Machine> = Object.assign( new Array<Machine>(), backResponse.lista );
        // console.log(lista);

        const machines = new Array<FullMachine | Machine>();

        for (let i = 0; i < lista.length; i++) {
            const machine = lista[i];

            const parsed: FullMachine | Machine = await getFullMachine(machine);
            machines.push(parsed);

        }

        return machines;
    }
    
    return [];

}

async function getFullMachine(machine_in: Machine): Promise<FullMachine | Machine>{

    type JSONResponse = {
        machine?: Omit<FullMachine, 'porta' | 'login' | 'senha' | 'status' | 'id' | 'create_date'>,
        errors?: Array<{ message: string }>
    }
    
    const url = `${APIURL}/machine/info`;

    const requestOptions = new RequestBuilder()
    .setMethod('POST')
    .setContentType("application/json")
    .setBody({"ip": machine_in.Network})
    .build();

    const response = await fetch(url, requestOptions);

    const { machine, errors }: JSONResponse = await response.json();

    if(response.ok){
		if (machine) {
			// add fetchedAt helper (used in the UI to help differentiate requests)
			return Object.assign(machine, { id: machine_in.id,  porta: machine_in.porta, 
                                            login: machine_in.login, status: true,
                                            create_date: machine_in.create_date,
                                            senha: machine_in.senha});

		} else {
            machine_in.status = false;
            return machine_in;
		}
    }else{
        console.error(errors);
        machine_in.status = false;
        return machine_in;
    }
}
