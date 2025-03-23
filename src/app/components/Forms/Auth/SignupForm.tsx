import { signup } from '@/app/server/signup/actions';
import { ActionResult } from '@/app/types/forms';
import styles from "./SignuForm.module.css"

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';

function Submit(){

    const { pending } = useFormStatus();

    return (
        <div className={styles.campo}>
            <button disabled={pending} type='submit' className={styles.botao}>
                { pending? <div className={styles.div_pending}>
                                <span className={styles._loading}/>
                                Salvando...
                            </div> : 'Cadastrar'}
            </button>
        </div>
    );
}


export function SignupForm(){

    const result: ActionResult = {}

    const [state, action] = useActionState(signup, result);
    //JSX
    return (
        <div className={styles.conteiner}>
            <h1 className={styles.titulo}>Cadastro</h1>
            <form action={action}>
                <div className={styles.campo}>
                    <label className={styles._label}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575.616 575.616" className={styles._svg}>
                            <path d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439    c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499    c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081    S181.727,202.994,181.727,144.499z"/>
                            <path d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919    V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982    c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742    C81.319,310.758,45.049,346.991,45.049,391.68z"/>
                        </svg>
                        <input name="name" type="text" autoComplete="name" className="grow" placeholder="Digite o nome completo." />
                    </label>
                </div>
                { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                <div className={styles.campo}>
                    <label className={styles._label}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className={styles._svg}>
                            <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input type='email' id="email" name='email' className="bg-white" placeholder="Digite um email" autoComplete='email'/>
                    </label>
                    { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                </div>
                <div className={styles.campo}>
                    <label className={styles._label}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className={styles._svg}>
                            <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                        </svg>
                        <input id="password" type="text" name="password" autoComplete='current-password' placeholder='Digite uma senha'/>
                    </label>
                    { state?.errors?.formErrors && <p className='text-error'>{state.errors.formErrors}</p> }
                </div>
                <div className={styles.campo}>
                    <select id='perfil' name='perfil' defaultValue={'N'} className="select select-bordered select-success">
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