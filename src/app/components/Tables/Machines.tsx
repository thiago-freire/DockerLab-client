"use client"

import styles from "@/app/components/Tables/Machines.module.css";
import { getMachineList } from "@/app/server/machines/actions";
import { GPU, FullMachine, Machine } from "@/app/types/types";
import { ReactElement, useEffect, useState } from "react";
// import { string } from "zod";
import { instanceOfFullMachine } from "@/app/types/types";

export function Machines(){

    const [machines, setMacinhes] = useState<Array<FullMachine | Machine>>();

    useEffect(()=>{

        async function getMachines(){

            const listMachines = await getMachineList();
            console.log(listMachines);
            setMacinhes(listMachines);
        }
        
        getMachines();

    },[]);

    function getNetwork(machine: FullMachine | Machine): ReactElement{

        if(typeof machine.Network === "string"){
            return <td>{machine.Network}</td>
        }else{
            return <td>{machine.Network.ip}</td>
        }
    }

    function getStatus(status: boolean){

        if(status){
            return (<td>
                        <div className="inline-grid *:[grid-area:1/1]">
                            <div className="status status-success status-lg animate-ping"></div>
                            <div className="status status-success status-lg"></div>
                        </div><strong> Online </strong>
                    </td>);
        }else{
            return (<td>
                        <div className="inline-grid *:[grid-area:1/1]">
                            <div className="status status-error status-lg animate-ping"></div>
                            <div className="status status-error status-lg"></div>
                        </div>
                        <strong> Offline </strong>
                    </td>);
        }
    }

    function getCPU(machine:  FullMachine | Machine): ReactElement{

        if(instanceOfFullMachine(machine) && machine.status){
            return <td>{machine.CPU.uso_total} %</td>
        }else{
            return <td>0 %</td>
        }
    }

    function getMemory(machine: FullMachine | Machine): ReactElement{

        if(instanceOfFullMachine(machine) && machine.status){
            return <td>
                        <p>{machine.Memory.Used}</p>
                        <p>{machine.Memory.Total}</p>
                        <p>{machine.Memory.Percentage} %</p>
                    </td>
        }else{
            return <td>0 %</td>
        }
    }

    function getGPU(machine: FullMachine | Machine): ReactElement{

        if(instanceOfFullMachine(machine) && machine.status && machine.GPU.length > 0){
            
            return <td><table>
                    {machine.GPU.map((gpu, index) => (
                        <tbody key={index}>
                            <tr><td><p>{gpu.id} - {gpu.nome}</p>
                            <p>{gpu.load} - {gpu.used} de {gpu.total}</p></td></tr>
                        </tbody>
                        ))}
                        </table>
                    </td>
             
        }else{
            return <td>Sem informações</td>
        }
       

    }

    return (

        <div className={styles.conteiner}>
            <table className={styles.table_}>
                <thead className={styles.thead_}>
                <tr>
                    <th></th>
                    <th>Hostname</th>
                    <th>IP</th>
                    <th>Cadastro</th>
                    <th>CPU (%)</th>
                    <th>RAM</th>
                    <th>VRAM</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {machines && machines.length > 0 ? (
                        machines.map((machine, index) => {
                            return (
                                <tr key={index} className={styles.tr_}>
                                    <th>{index}</th>
                                    <td>{machine.Nome}</td>
                                    {getNetwork(machine)}
                                    <td>{machine.create_date}</td>
                                    {getCPU(machine)}
                                    {getMemory(machine)}
                                    {getGPU(machine)}
                                    {getStatus(machine.status)}
                                </tr>
                            )
                        })
                    ) : (
                        <tr className="text-center text-gray-400 h-[40px]">
                            <td colSpan={9}>Sem dados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

{/* <tr className={styles.tr_}>
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
                    </tr> */}