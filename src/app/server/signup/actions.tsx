
// 'use server';
// import 'server-only';
// import { SignupFormSchema } from './definitions';
// // import bcrypt from 'bcrypt';
// import { redirect } from 'next/navigation';
// import { APIURL } from '../globals';
// import { User } from '@/app/types/types';

// /**
//  * Valida o formulário utilizando o esquema SignupFormSchema 
//  * @param {FormData} formData O formulário a ser validado 
//  * @returns {import('zod').SafeParseReturnType} Resultado da validação
//  */
// function validateResult(formData: FormData){

//     const name = formData.get('name');
//     const surname = formData.get('surname');
//     const email = formData.get('email');
//     const password = formData.get('password');
//     const perfil = formData.get('perfil');

//     const user: User = {
//         name: name != null ? name.toString() : "",
//         email: email != null ? email.toString() : "",
//         profile: perfil != null ? perfil.toString() : "",
//         imagem
//         // login: email != null ? email.toString().substring(0, email.toString().indexOf('@')) : "",
//     }

//     const result = SignupFormSchema.safeParse(user);
                    
//     return result
// }

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

export async function signup(_: any, formData: FormData){
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

}   