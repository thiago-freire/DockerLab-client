export interface LoginData {
    email: string;
    password: string;
}

export interface ErrorType {
    message: string[];
    type: string;
}

export interface User {
    name: string,
    surname: string,
    login: string,
    email: string,
    password: string,
    profile: string
}
