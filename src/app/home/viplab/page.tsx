"use client";

import { Nodes } from "@/app/components/Tables/Nodes";
import styles from "@/app/home/home.module.css"

export default function Page(){

    return  <div className={styles.conteiner}>
                <h1 className="text-sky-950 font-bold text-2xl mt-4 mb-6">Dashboard</h1>
                <Nodes/>
            </div>;
}