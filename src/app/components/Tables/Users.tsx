"use client"

import styles from "@/app/components/Tables/Users.module.css";
import { getUserList } from "@/app/server/users/actions";
import { User } from "@/app/types/objects";
import { ReactElement, useEffect, useState } from "react";

export function Users(data: {setEditingUser: (us: User)=> void, update: number}){

    const [users, setUsers] = useState<Array<User>>();


    useEffect(()=>{

        async function getUsers(){

            const listUsers = await getUserList();
            console.log(listUsers);
            setUsers(listUsers);
        }
        
        getUsers();

    },[data.update]);

    function getPerfil(user: User): ReactElement{
    
            if(user.profile == "A"){
                return <td>Administrador</td>
            }else{
                return <td>Usuário</td>
            }
    }

    function handleDelete(user: User){
        console.log(user);
    }

    function handleEdit(user: User){
        console.log(user);
        data.setEditingUser(user);
    }

    return (

        <div className={styles.conteiner}>
            <table className={styles.table_}>
                <thead className={styles.thead_}>
                <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Perfil</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users && users.length > 0 ? (
                        users.map((user, index) => {
                            return (
                                <tr key={index} className={styles.tr_}>
                                    <th>{index}</th>
                                    <td>{user.id}</td>
                                    <td>{user.login}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    {getPerfil(user)}
                                    <td>
                                        <button onClick={() => handleEdit(user)}>Editar</button>
                                    </td>
                                    <td>
                                      <button onClick={() => handleDelete(user)}>Excluir</button>
                                    </td>

                                </tr>
                            )
                        })
                    ) : (
                        <tr className="text-center text-gray-400 h-[40px]">
                            <td colSpan={7}>Sem dados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}