
'use server';
import 'server-only';
// import bcrypt from 'bcrypt';
import { APIURL } from '../globals';
import { User } from '@/app/types/objects';

import { getErrorsForBack } from '@/app/server/errors/formatError';
import { RequestBuilder } from '../requests/builder';
import { ActionErrors } from '@/app/types/forms';

export async function createUser(user_send: Omit<User, 'id'>): Promise<User | ActionErrors>{

    type JSONResponse = {
        user?: User,
        error?: Array<{ message: string }>
    }

    const requestOptions = new RequestBuilder()
    .setMethod('POST')
    .setContentType("application/json")
    .setBody(user_send)
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
        
        console.log(error)
        if(typeof error == "string"){
            return getErrorsForBack(error);
        }else{
            const itens: string[] = [];
            error?.forEach(item=>{
                itens.push(item.message);
            });
            return getErrorsForBack(itens);
        }
    }
}

export async function updateUser(user_send: User): Promise<Boolean | ActionErrors>{

    type JSONResponse = {
        resp?: Boolean,
        error?: Array<{ message: string }>
    }

    const requestOptions = new RequestBuilder()
    .setMethod('POST')
    .setContentType("application/json")
    .setBody(user_send)
    .build();

    const url = `${APIURL}/user/update`;

    const response = await fetch(url, requestOptions);

    const { resp, error }: JSONResponse = await response.json();

    if(response.ok){
        console.log(resp);
		if (resp) {
			return resp;
		} else {
            return getErrorsForBack('Erro no Backend ao atualizar usuário.');
		}
    }else{
        
        console.log(error)
        if(typeof error == "string"){
            return getErrorsForBack(error);
        }else{
            const itens: string[] = [];
            error?.forEach(item=>{
                itens.push(item.message);
            });
            return getErrorsForBack(itens);
        }
    }
}

export async function getUserList(): Promise<Array<User>>{
    
    const retorno: Array<User> = [];

    const url = `${APIURL}/user/list`;
    
    const backResponse = await fetch(url)
    .then(reponse => reponse.json())
    .catch(error => {
        return {'mensage': 'Erro ao enviar dados a API', 'status': false, 'error':error};
    });

    if(!backResponse.status){

        const users : Array<User> = Object.assign( new Array<User>(), backResponse.lista );
        return users;
    }


    return retorno
}
// /**
//  * Extrai name, surname, email e password de um formulário e calcula a hash da senha utilizando bcrypt
//  * @param {FormData} validateResult 
//  * @returns {name, surname, email, password, hashedPassword} Objeto com os campos extraidos
//  */
// async function getDataFromResult(validateResult: Zod.SafeParseSuccess<User>){
    
//     const user = validateResult.data;
//     // user.password = await bcrypt.hash(user.password, 10)
    
//     return user
// }

// /**
//  * Envia um objeto usuário para API
//  * @param {Object} user Usuário a ser enviado para a API
//  * @returns {Any} Resposta da API 
//  */
// async function sendUsertoAPI(user: User){

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     };
//     const url = `${APIURL}/user/create`;

//     const userResponse = await fetch(url, requestOptions)
//     .then(reponse => reponse.json())
//     .catch(error => {
//         throw new TypeError("Error ao enviar os dados para API")
//     });

//     return userResponse;

// }

// export async function signup(_: any, formData: FormData){

    // console.log(_, formData);
//     // Validação dos campos do formulário de signup
//     const validationResult = validateResult(formData);
//     if (!validationResult.success){
        
//         return {
//             errors: validationResult.error.flatten().fieldErrors,
//         }
//     }
    
//     const user = await getDataFromResult(validationResult);

//     try{
//         // Registrar no Banco
//         const userRegistered = await sendUsertoAPI(user)
//         console.log(userRegistered);
        
//         // Verifica se o usuário foi criado    
//         if (!userRegistered){
//             return {
//                 message: 'Um erro ocorreu na criação da conta'
//             };
//         }

//         // Set cookie para conta criado para exibir mensagem <p>Conta Criada! Por favor faça Login.</p> na página de Login
//         // cookies().set('accountCreated', true, {
//         //     httpOnly: true,
//         //     secure: false,
//         //     expires: 1,
//         //     sameSite: 'lax',
//         //     path: '/',
//         // });
//     }catch(error){
//         return {
//             message: 'Servidor Offine '+error
//         }
//     }     
//     // Redireciona para página de login após criar conta
//     redirect('/login');

// }   