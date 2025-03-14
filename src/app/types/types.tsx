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


export interface Machine {

    nome: string | null | undefined;
    ip: string | null | undefined;
    porta: number | null | undefined;
    login: string | null | undefined;
    senha: string | null | undefined;
}

export interface Node {

    nome: string | null | undefined;
    maquina: number | null | undefined;
    usuario: string | null | undefined;
    cores: number | null | undefined;
    ram: number | null | undefined;
    device: number | null | undefined;
    network: number | null | undefined;
}

export interface ResponseDockerLab {

    mensage: string;
    status: boolean;
    error: string | null | undefined;
}

