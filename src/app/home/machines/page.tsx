"use client";

import { MachinesForm } from "@/app/components/Forms/register/MachinesForm";
import { Machines } from "@/app/components/Tables/Machines";
import styles from "@/app/home/home.module.css"

export default function Page(){

    return  <div className={styles.conteiner}>
                <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Registro de Máquinas</div>
                    <div className="collapse-content">
                        <MachinesForm/>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Registro de Máquinas</div>
                    <div className="collapse-content">
                        <Machines/>
                    </div>
                </div>
            </div>;
}