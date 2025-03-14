"use client"

import styles from "@/app/components/Tables/RegistredMachines.module.css";

export function RegistredMachines(){


    return (

        <div className={styles.conteiner}>
            <table className={styles.table_}>
                <thead className={styles.thead_}>
                <tr>
                    <th></th>
                    <th>Hostname</th>
                    <th>IP</th>
                    <th>Data de Registo</th>
                    <th>CPU (%)</th>
                    <th>RAM</th>
                    <th>VRAM</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    <tr className={styles.tr_}>
                        <th>1</th>
                        <td>SRV-VIPLAB1</td>
                        <td>192.168.200.111</td>
                        <td>02/07/2025</td>
                        <td>i9 14700K (0%)</td>
                        <td>2 de 64GB (3%)</td>
                        <td>0 de 24GB (0%)</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-error status-lg animate-ping"></div>
                                <div className="status status-error status-lg"></div>
                            </div>
                            <strong> Offline </strong>
                        </td>
                    </tr>
                    <tr className={styles.tr_}>
                        <th>2</th>
                        <td>SRV-VIPLAB2</td>
                        <td>192.168.200.222</td>
                        <td>02/07/2025</td>
                        <td>i9 13700K (55%)</td>
                        <td>16 de 64GB (25%)</td>
                        <td>24 de 24GB (100%)</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-success status-lg animate-ping"></div>
                                <div className="status status-success status-lg"></div>
                            </div><strong> Online </strong>
                        </td>
                    </tr>
                    <tr className={styles.tr_}>
                        <th>3</th>
                        <td>SRV-VIPLAB3</td>
                        <td>192.168.200.190</td>
                        <td>02/07/2025</td>
                        <td>i9 13700K (0%)</td>
                        <td>8 de 64GB (12%)</td>
                        <td>48 de 96GB (50%)</td>
                        <td>
                            <div className="inline-grid *:[grid-area:1/1]">
                                <div className="status status-success status-lg animate-ping"></div>
                                <div className="status status-success status-lg"></div>
                            </div><strong> Online </strong>
                        </td>
                    </tr>
                    <tr className={styles.tr_}>
                        <th>4</th>
                        <td>SRV-VIPLAB5</td>
                        <td>192.168.200.251</td>
                        <td>02/07/2025</td>
                        <td>i9 14700K (10%)</td>
                        <td>48 de 96GB (50%)</td>
                        <td>48 de 96GB (50%)</td>
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