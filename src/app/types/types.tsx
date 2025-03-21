import { MouseEventHandler } from "react";

export interface LoginData {
    email: string;
    password: string | null;
}

export interface ErrorType {
    message: string[];
    type: string;
}

export interface User {
    name: string | null | undefined,
    email: string | null | undefined,
    imagem: string | null | undefined,
    profile: string | null | undefined
}

export interface MenuListItemParam {

    image: React.ReactNode, 
    href: string, 
    children: React.ReactNode, 
    onclick: MouseEventHandler<HTMLLIElement>
}

export interface CPU {

    cores_fisicos: number;
    cores_totais: number;
    freq_max: number;
    freq_min: number;
    frequencia: number;
    uso_total: number;
}

export interface Memory {

    Total: string,
    Available: string,
    Used: string,
    Percentage: number,
}

export interface HardDisk {

    device: string,
    mountpoint: string,
    total_size: string,
    used: string,
    free: string,
    percentage: number
}

export interface Network {

    device: string,
    ip: string,
    mascara: string,
    broadcast: string
}

export function instanceOfFullMachine(object: object): object is FullMachine {
    return 'CPU' in object;
}

export interface GPU {

    id: number, 
    nome: string,
    load: string,
    free: string, 
    used: string,
    total: string,
    temperature: number
}

export interface FullMachine {

    id: number;
    Nome: string;
    porta: number;
    login: string;
    senha: string;
    status: boolean;
    create_date: string;

    GPU: Array<GPU>;
    Network: Network | string;
    HardDisk: Array<HardDisk>;
    Memory: Memory;
    CPU: CPU;
}

export type Machine = Omit<FullMachine, 'GPU' | 'HardDisk' | 'Memory' | 'CPU'>;

export interface ResponseDockerLab {

    mensage: string;
    status: boolean;
    error: string | null | undefined;
}

export interface RequestOptions {

    method: 'GET' | 'POST';
    headers: Map<string, string>;
    body: FormData | string | undefined;
}

