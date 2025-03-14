"use client"

import styles from "@/app/components/Tables/Nodes.module.css";

export function Nodes(){


    return (

        <div className={styles.conteiner}>
            <table className={styles.table_}>
                <thead className={styles.thead_}>
                <tr>
                    <th>Nome</th>
                    <th>Máquina</th>
                    <th>Usuário</th>
                    <th>Tempo de uso</th>
                    <th>CPU Core</th>
                    <th>RAM</th>
                    <th>VRAM</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    <tr className={styles.tr_}>
                        <th>CP-Vision-001</th>
                        <td>SRV-VIPLAB1</td>
                        <td>Marcos</td>
                        <td>0</td>
                        <td>4</td>
                        <td>24GB</td>
                        <td>24GB</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-error status-lg animate-ping"></div>
                                <div className="status status-error status-lg"></div>
                            </div>
                            <strong> Offline </strong>
                        </td>
                    </tr>
                    <tr className={styles.tr_}>
                        <th>CP-Vision-002</th>
                        <td>SRV-VIPLAB1</td>
                        <td>Gabriel</td>
                        <td>1d 5h 32m</td>
                        <td>4</td>
                        <td>24GB</td>
                        <td>24GB</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-success status-lg animate-ping"></div>
                                <div className="status status-success status-lg"></div>
                            </div><strong> Online </strong>
                        </td>
                    </tr>
                    <tr className={styles.tr_}>
                        <th>LLM-001</th>
                        <td>SRV-VIPLAB3</td>
                        <td>Lucas</td>
                        <td>2d 5h 13m</td>
                        <td>24</td>
                        <td>64GB</td>
                        <td>12GB</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-success status-lg animate-ping"></div>
                                <div className="status status-success status-lg"></div>
                            </div><strong> Online </strong>
                        </td>
                    </tr>
                    <tr className={styles.tr_}>
                        <th>CP-Vision-003</th>
                        <td>SRV-VIPLAB2</td>
                        <td>Thiago</td>
                        <td>1d 3h 22m</td>
                        <td>12</td>
                        <td>48GB</td>
                        <td>12GB</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-success status-lg animate-ping"></div>
                                <div className="status status-success status-lg"></div>
                            </div><strong> Online </strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}