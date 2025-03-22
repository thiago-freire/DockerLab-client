"use client";

import "client-only";

// import bcrypt from 'bcrypt'
import type { LoginData } from "@/app/types/objects"

/**
 * Extrai dados de um formulário: email e password e cifra a password
 * @param {FormData} validateResult Formulário com os campos
 * @returns {email, hashedPassword} Objeto com email e hashedPassword
 */
export async function getDataFromResult(data: Zod.SafeParseSuccess<LoginData>) : Promise<LoginData>{

    // data.password = await bcrypt.hash(data.password, 10);
    // const email = data.email;
    
    // return { email, password}

    return data.data;
}