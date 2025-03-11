export interface LoginData {
    email: string;
    password: string | null;
}

export interface ErrorType {
    message: string[];
    type: string;
}

export interface User {
    name: string | null,
    surname: string | null,
    login: string | null,
    email: string | null,
    password: string | null,
    profile: string | null
}
