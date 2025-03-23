"use client";

import "client-only";

// import bcrypt from 'bcrypt'
import type { LoginData } from "@/app/types/objects"

/**
 * Extrai dados de um formulário: email e password e cifra a password
 * @param {Zod.SafeParseSuccess<LoginData>} data Formulário com os campos
 * @returns {Promise<LoginData>} Objeto com email e hashedPassword
 */
export async function getDataFromResult(data: Zod.SafeParseSuccess<LoginData>) : Promise<LoginData>{

    const login = data.data.login;
    
    // if(data.data.password != null){
    //     data.data.password = await bcrypt.hash(data.data.password, 10);
    // }
        
    const password = data.data.password;
    
    return {login, password}
}