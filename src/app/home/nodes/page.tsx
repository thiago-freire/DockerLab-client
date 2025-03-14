"use client";

import { NodesForm } from "@/app/components/Forms/register/NodesForm";
import { Nodes } from "@/app/components/Tables/Nodes";
import styles from "@/app/home/home.module.css"

export default function Page(){

    return  <div className={styles.conteiner}>
                <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Registro de Máquinas</div>
                    <div className="collapse-content">
                        <NodesForm/>
                    </div>
                </div>
                <div tabIndex={0} className="collapse collapse-open collapse-arrow bg-base-100 border-base-300 border">
                    <div className="collapse-title font-semibold">Registro de Máquinas</div>
                    <div className="collapse-content">
                        <Nodes/>
                    </div>
                </div>
            </div>;
}