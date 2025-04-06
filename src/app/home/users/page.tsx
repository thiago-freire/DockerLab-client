"use client"
import { SignupForm } from "@/app/components/Forms/Auth/SignupForm";
import { Users } from "@/app/components/Tables/Users";
import styles from "@/app/home/home.module.css"
import { User } from "next-auth";
// import { User } from "@/app/types/objects";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page(){

    const [editingUser, setEditingUser] = useState<User>({id:0, name:'', email:'', login:'', password:'', profile: "N"});
    const [update, setUpdate] = useState<number>(0);
    const [profile, setProfile] = useState<'A'|'U'>('U');

    useEffect(()=>{

        const verifySession = async () => {
            const session = await getSession();
            if(session && session.user)
                console.log(session.user);
            return session;
        }
    
        verifySession().then((session)=>{
            if(session){
                const user = session.user;
    
                console.log(user);
    
                if(user.profile != 'N')
                    setProfile(user.profile);
            }
        });
    },[]);
    
    return  <div className={styles.conteiner}>
                {profile == 'A' && <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Cadastro de Usuários</div>
                    <div className="flex collapse-content justify-center items-center">
                        <SignupForm editingUser={editingUser} update={update} setUpdate={setUpdate}/>
                    </div>
                </div>}
                <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Lista de Usuários</div>
                    <div className="collapse-content">
                        <Users setEditingUser={setEditingUser} update={update} profile={profile}/>
                    </div>
                </div>
            </div>;
}