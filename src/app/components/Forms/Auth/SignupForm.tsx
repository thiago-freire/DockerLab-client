import { signup } from '@/app/server/signup/actions';
import { ActionResult } from '@/app/types/forms';

import { useFormState, useFormStatus } from 'react-dom';

function Submit(){

    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type='submit' className="btn btn-primary bg-primary hover:bg-secondary hover:text-primary mx-20">
            { pending? <div className='flex flex-row items-center gap-2 text-primary'>
                            <span className="loading loading-spinner loading-md"/>
                            Salvando...
                        </div> : 'Cadastrar'}
        </button>
    );
}


export function SignupForm(){

    const result: ActionResult = {}

    const [state, action] = useFormState(signup, result);
    //JSX
    return (
        <div className='bg-white flex flex-col items-center rounded-xl py-16'>
            <h1 className='font-bold font-display text-4xl text-black mb-16'>Cadastro</h1>
            <form action={action}>
                <label className="input input-primary input-bordered flex items-center gap-2 mt-5 bg-white text-black mx-5">
                    Nome
                    <input name="name" type="text" autoComplete="name" className="grow" placeholder="Digite o nome completo." />
                </label>
                { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                <div className='flex flex-col mt-5 mx-5'>
                    <label className="input input-bordered input-primary flex items-center gap-2 bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input 
                            type='email'
                            id="email"
                            name='email'
                            className="bg-white" 
                            placeholder="Digite um email" 
                            autoComplete='email'/>
                    </label>
                    { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                </div>
                <div className='flex flex-col mt-3 mb-5 mx-5'>
                    <label className="input input-bordered input-primary flex items-center gap-2 bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                        </svg>
                        <input 
                            id="password"
                            type="password"
                            name="password"
                            autoComplete='current-password'
                            placeholder='Digite uma senha'/>
                    </label>
                    { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                </div>
                <div className='flex flex-col mt-3 mb-5 mx-5'>
                    <select id='perfil' name='perfil' defaultValue={'N'} className="select select-bordered select-primary">
                        <option disabled value={'N'}>Escolha um Perfil</option>
                        <option value={'A'}>Administrador</option>
                        <option value={'U'}>Usuário</option>
                    </select>
                    { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                </div>
                <Submit/>
                {/* {state?.message && (<div className='text-error mt-2 text-center'>{state?.message}</div>)} */}
            </form>
        </div>
        
    );
}