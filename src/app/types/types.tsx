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
