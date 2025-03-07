
import styles from "@/app/components/Buttons/Login/LoginButton.module.css"

export function SubmitButton(isPending: {isPending: boolean}){
    
    return (
        <button disabled={isPending} type='submit' className={styles.submit_button}>
            { isPending ? <div className={styles.innerDiv}>
                            <span className={styles.loadingIcon}/>
                            Entrando...
                        </div> : 'Entrar'}
        </button>
    );
}