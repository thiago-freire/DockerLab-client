
import styles from "@/app/components/Buttons/Login/LoginButton.module.css"

export function SubmitButton(invar: {isPending: boolean}){

    return (
        <button disabled={invar.isPending} type='submit' className={styles.submit_button}>
            { invar.isPending ? <div className={styles.innerDiv}>
                            <span className={styles.loadingIcon}/>
                            Entrando...
                        </div> : 'Entrar'}
        </button>
    );
}