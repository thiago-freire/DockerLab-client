import Image from 'next/image';
import email_Icon from '@/assets/Login/email_Icon.svg';
import password_Icon from '@/assets/Login/password_Icon.svg';
import styles from "@/app/components/Icons/Login/icons.module.css"

export function EmailIcon(){
    return <Image 
        src={email_Icon}
        className={styles.icon}
        alt='Ícone de email'
        loading='lazy'
    />
}

export function PasswordIcon(){
    return <Image
        src={password_Icon}
        className={styles.icon}
        alt='Ícone de senha'
        loading='lazy'
    />
}