import { ActionErrors } from "@/app/types/forms";
import { User } from "@/app/types/objects";
import { APIURL } from "../globals";
import { RequestBuilder } from "../requests/builder";
import { getErrorsForBack } from "../errors/formatError";


/**
 * Valida o formulário utilizando o esquema SignupFormSchema 
 * @param {FormData} formData O formulário a ser validado 
 * @returns {import('zod').SafeParseReturnType} Resultado da validação
 */
export async function sendUsertoAPI(user_login: Omit<User, 'id' | 'name' | 'email' | 'profile'>): Promise<User | ActionErrors> {

    type JSONResponse = {
        user?: User,
        error?: Array<{ message: string }>
    }

    console.log(user_login);

    const requestOptions = new RequestBuilder()
    .setMethod('POST')
    .setContentType("application/json")
    .setBody(user_login)
    .build();

    const url = `${APIURL}/user/create`;

    const response = await fetch(url, requestOptions);

    const { user, error }: JSONResponse = await response.json();

    if(response.ok){
        if (user) {
            return user;
        } else {
            return getErrorsForBack('Erro no Backend ao cadastrar usuário.');
        }
    }else{
        const itens: string[] = [];
        error?.forEach(item=>{
            itens.push(item.message);
        });
        return getErrorsForBack(itens);
    }
}
