"use client";

import { MachinesForm } from "@/app/components/Forms/register/MachinesForm";
import { Machines } from "@/app/components/Tables/Machines";
import styles from "@/app/home/home.module.css"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page(){

    const [profile, setProfile] = useState<'A'|'U'>('U');
    
    const {data: session} = useSession();

    useEffect(()=>{

        if(session){
            const user = session.user;

            console.log(user);

            if(user.profile != 'N')
                setProfile(user.profile);
        }
    },[]);

    return  <div className={styles.conteiner}>
                {profile == 'A' && <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Registro de Máquinas</div>
                    <div className="collapse-content">
                        <MachinesForm/>
                    </div>
                </div>}
                <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Registro de Máquinas</div>
                    <div className="collapse-content">
                        <Machines/>
                    </div>
                </div>
            </div>;
}