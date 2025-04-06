"use client"

import styles from "@/app/components/Tables/Users.module.css";
import { deleteUser, getUserList } from "@/app/server/users/actions";
import { User } from "next-auth";
// import { User } from "@/app/types/objects";
import { ReactElement, useEffect, useState } from "react";

export function Users(data: {setEditingUser: (us: User)=> void, update: number, profile:'A'|'U'}){

    const [users, setUsers] = useState<Array<User>>();
    const [toast, setToast] = useState<React.ReactNode>(null);

    useEffect(()=>{
        
        getUsers();

    },[data.update]);

    function getPerfil(user: User): ReactElement{
    
            if(user.profile == "A"){
                return <td>Administrador</td>
            }else{
                return <td>Usuário</td>
            }
    }

    async function getUsers(){

        const listUsers = await getUserList();
        console.log(listUsers);
        setUsers(listUsers);
    }

    async function handleDelete(user: User){

        const resp = await deleteUser(user);

        if(resp){

            setToast(<div className="toast toast-bottom toast-end">
                        <div className="alert alert-success">
                        <span>Usuário removido com Sucesso.</span>
                        </div>
                    </div>);
            setTimeout(()=>{setToast(null)}, 2000);
            getUsers();
        }else{

            setToast(<div className="toast toast-bottom toast-end">
                        <div className="alert alert-error">
                        <span>Erro ao deletar Usuário.</span>
                        </div>
                    </div>);
            setTimeout(()=>{setToast(null)}, 2000);
        }

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
                    {data.profile == 'A' && <th></th>}
                    {data.profile == 'A' && <th></th>}
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
                                    {data.profile == 'A' && <td>
                                        <button onClick={() => handleEdit(user)}>Editar</button>
                                    </td>}
                                    {data.profile == 'A' && <td>
                                      <button onClick={() => handleDelete(user)}>Excluir</button>
                                    </td>}
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
            {toast}
        </div>
    );
}