"use client";
import "client-only";

import {useEffect, useState} from "react";
import styles from "@/app/components/Header/Sidebar.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, getSession } from "next-auth/react";
import { MenuListItemParam} from "@/app/types/objects";
import { User } from "next-auth";
import { Session } from "next-auth";

export default function HeaderMenu() {

  const [user, setUser] = useState<User>();
  const [letra, setLetra] = useState<string>();
  const [param1, setParam1] = useState<MenuListItemParam[]>();
  const [param2, setParam2] = useState<MenuListItemParam>();

  const router = useRouter()

  async function handleLogout() {
    await signOut({ redirect: false })
    router.push("/login");
  }

  useEffect(() =>{

    const verifySession = async () => {
      const session: Session | null = await getSession();
      return session;
    }

    verifySession().then((session)=>{
        if (!session) {
            router.push("/login", {scroll: false});
        }else{
          if(session.user){
            const user: User = session.user;
            console.log(user);
            setUser(user);
          }
        }
    });
    
  },[router]);

  useEffect(()=>{

    if(user && user.name){
      const fristLetra = user.name.charAt(0).toUpperCase();
      setLetra(fristLetra);
    }else{
      setLetra('D');
    }

    const menuParam1: MenuListItemParam[] = [
      {
        image:<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14,12c0,1.019-.308,1.964-.832,2.754l-2.875-2.875c-.188-.188-.293-.442-.293-.707V7.101c2.282,.463,4,2.48,4,4.899Zm-6-.414V7.101c-2.55,.518-4.396,2.976-3.927,5.767,.325,1.934,1.82,3.543,3.729,3.992,1.47,.345,2.86,.033,3.952-.691l-3.169-3.169c-.375-.375-.586-.884-.586-1.414Zm11-4.586h-2c-.553,0-1,.448-1,1s.447,1,1,1h2c.553,0,1-.448,1-1s-.447-1-1-1Zm0,4h-2c-.553,0-1,.448-1,1s.447,1,1,1h2c.553,0,1-.448,1-1s-.447-1-1-1Zm0,4h-2c-.553,0-1,.448-1,1s.447,1,1,1h2c.553,0,1-.448,1-1s-.447-1-1-1Zm5-7v8c0,2.757-2.243,5-5,5H5c-2.757,0-5-2.243-5-5V8C0,5.243,2.243,3,5,3h14c2.757,0,5,2.243,5,5Zm-2,0c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v8c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V8Z"/>
              </svg>,
        href: "/home/viplab",
        onclick: ()=>{},
        children: <div>Dashboard</div>
      },
      {
        image:<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19,1H5A5.006,5.006,0,0,0,0,6v8a5.006,5.006,0,0,0,5,5h6v2H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2H13V19h6a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,3,3v7H2V6A3,3,0,0,1,5,3ZM19,17H5a3,3,0,0,1-2.816-2H21.816A3,3,0,0,1,19,17Z"/>
              </svg>,
        href: "/home/machines",
        onclick: ()=>{},
        children: <div>Máquinas</div>
      },
      {
        image:<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5,12c-.664,0-1.298,.124-1.888,.34l-1.003-1.697c1.156-1.008,1.89-2.488,1.89-4.143,0-3.038-2.462-5.5-5.5-5.5S6.5,3.462,6.5,6.5c0,1.655,.734,3.135,1.89,4.143l-1.003,1.697c-.59-.216-1.223-.34-1.888-.34-3.038,0-5.5,2.462-5.5,5.5s2.462,5.5,5.5,5.5c2.696,0,4.934-1.941,5.405-4.5h2.19c.471,2.559,2.709,4.5,5.405,4.5,3.038,0,5.5-2.462,5.5-5.5s-2.462-5.5-5.5-5.5Zm0,2c.828,0,1.5,.672,1.5,1.5s-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5ZM12,3c.828,0,1.5,.672,1.5,1.5s-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5Zm-1.5,4h3c.763,0,1.386,.572,1.481,1.309-.615,1.009-1.716,1.691-2.981,1.691s-2.366-.681-2.981-1.69c.094-.738,.717-1.31,1.481-1.31Zm-5,7c.828,0,1.5,.672,1.5,1.5s-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5,.672-1.5,1.5-1.5Zm0,7c-1.265,0-2.366-.681-2.981-1.69,.094-.738,.717-1.31,1.481-1.31h3c.763,0,1.386,.572,1.481,1.309-.615,1.009-1.716,1.691-2.981,1.691Zm7.595-4.5h-2.19c-.229-1.246-.878-2.343-1.795-3.143l1.003-1.697c.589,.216,1.223,.339,1.887,.339s1.298-.124,1.887-.339l1.003,1.697c-.917,.8-1.565,1.897-1.795,3.143Zm5.405,4.5c-1.265,0-2.366-.681-2.981-1.69,.094-.738,.717-1.31,1.481-1.31h3c.763,0,1.386,.572,1.481,1.309-.615,1.009-1.716,1.691-2.981,1.691Z"/>
              </svg>,
        href: "/home/nodes",
        onclick: ()=>{},
        children: <div>Nós</div>
      },
      {
        image:<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0 -1.07-.48l-1.88.38a1 1 0 0 1 -1.15-.66l-.61-1.83a1 1 0 0 0 -.95-.68h-4a1 1 0 0 0 -1 .68l-.56 1.83a1 1 0 0 1 -1.15.66l-1.93-.38a1 1 0 0 0 -1 .48l-2 3.46a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32l-1.27 1.44a1 1 0 0 0 -.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0 -.12-1.17zm-1.49 1.34.8.9-1.28 2.22-1.18-.24a3 3 0 0 0 -3.45 2l-.38 1.12h-2.56l-.36-1.14a3 3 0 0 0 -3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 0 0 0-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 0 0 3.45-2l.38-1.13h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 0 0 0 3.98zm-6.77-6a4 4 0 1 0 4 4 4 4 0 0 0 -4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z"/>
              </svg>,
        href: "#",
        onclick: ()=>{},
        children: <div>Configurações</div>
      },
    ];

    if(user && user.profile == 'A'){
      menuParam1.push({
        image:<svg className={styles.svg_icon} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M256 0c68 0 132.89 26.95 180.96 75.04C485.05 122.99 512 188.11 512 256c0 68-26.95 132.89-75.04 180.96-23.49 23.56-51.72 42.58-83.15 55.6C323.59 505.08 290.54 512 256 512c-34.55 0-67.6-6.92-97.83-19.44l-.07-.03c-31.25-12.93-59.42-31.93-83.02-55.54l-.07-.07C26.9 388.82 0 324.03 0 256 0 116.78 112.74 0 256 0zm-52.73 332.87a67.668 67.668 0 01-5.6-6.74c-10.84-14.83-20.55-31.61-30.32-47.22-7.06-10.41-10.78-19.71-10.78-27.14 0-7.95 4.22-17.23 12.64-19.34-1.11-15.99-1.49-31.77-.74-48.88.37-4.08 1.12-8.17 2.23-12.27 4.84-17.1 16.73-30.86 31.61-40.15 5.2-3.35 10.78-5.94 17.1-8.18 10.78-4.09 5.57-20.45 17.48-20.82 27.88-.74 73.61 23.06 91.46 42.38 10.41 11.16 17.1 26.03 18.22 45.74l-1.12 44.03c5.2 1.49 8.55 4.84 10.04 10.04 1.49 5.95 0 14.13-5.2 25.67 0 .36-.38.36-.38.74-11.47 18.91-23.39 40.77-36.57 58.33-6.63 8.83-12.07 7.26-6.42 15.74 26.88 36.96 79.9 31.82 112.61 56.44 35.73-40.16 55.15-91.48 55.15-145.24 0-58.34-22.8-113.35-64.07-154.61v-.08C369.44 60.1 314.23 37.32 256 37.32 134.4 37.32 37.32 135.83 37.32 256c0 53.85 19.41 105.03 55.15 145.24 32.72-24.62 85.73-19.48 112.61-56.44 4.68-7.01 3.48-6.33-1.81-11.93z"/>
              </svg>,
        href: "/home/users",
        onclick: ()=>{},
        children: <div>Usuários</div>
      });
    }

    setParam1(menuParam1);

    const menuParam2: MenuListItemParam = {
      image:<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="m22 6.62219v10.62281c0 1.1129-.7143 2.2258-1.8367 2.6304l-5.1021 1.9223c-.3061.1011-.6122.2023-1.0204.2023-.5102 0-1.1224-.2023-1.6326-.5058-.2041-.2024-.5102-.4047-.6123-.6071h-3.87753c-1.53061 0-2.85715-1.214-2.85715-2.8327v-1.0117c0-.4047.30613-.8094.81633-.8094.51021 0 .81633.3035.81633.8094v1.0117c0 .7082.61224 1.214 1.22449 1.214h3.36733v-14.56843h-3.36733c-.71429 0-1.22449.50585-1.22449 1.21404v1.01169c0 .40468-.30612.80936-.81633.80936-.5102 0-.81633-.40468-.81633-.80936v-1.01169c0-1.51755 1.2245-2.83276 2.85715-2.83276h3.87753c.2041-.20234.4082-.40468.6123-.60702.8163-.50585 1.7347-.60702 2.653-.30351l5.1021 1.92223c1.0204.30351 1.8367 1.41638 1.8367 2.52924z"/>
              <path d="m4.85714 14.8169c-.20408 0-.40816-.1011-.5102-.2023l-2.04082-2.0234c-.10204-.1012-.10204-.2023-.20408-.2023 0-.1012-.10204-.2024-.10204-.3035 0-.1012 0-.2024.10204-.3035 0-.1012.10204-.2024.20408-.2024l2.04082-2.02338c.30612-.30351.81633-.30351 1.12245 0s.30612.80938 0 1.11288l-.71429.7082h4.18368c.40816 0 .81632.3035.81632.8093 0 .5059-.40816.6071-.81632.6071h-4.28572l.71429.7081c.30612.3035.30612.8094 0 1.1129-.10204.1012-.30613.2023-.51021.2023z"/>
            </svg>,
      href: "#",
      onclick: () => {handleLogout(); },
      children: <div>Logout</div>
    }

    setParam2(menuParam2);

  },[user]);

  return (
    <>
      <div className={styles.header_bar}>
        <div className="navbar-start">
          <div className="dropdown">
            <button className="btn btn-circle btn-ghost mr-8 w-11 h-11">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-8 w-8 stroke-current"> 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-sky-700 rounded-box z-1 mt-3 w-52 p-2 shadow">
                {param1 && <MenuListItem param={param1[0]}/>}
                {param1 && <MenuListItem param={param1[1]}/>}
                {param1 && <MenuListItem param={param1[2]}/>}
                {param1 && <MenuListItem param={param1[3]}/>}
                {param1 && param1.length == 5 && <MenuListItem param={param1[4]}/>}
            </ul>
          </div>
        </div>
        <div className='navbar-end'>
          <div className="flex flex-col">
            <div className='mx-4'>{user?.name}</div>
            <div className='mx-4 text-xs text-gray-400'>{user?.email}</div>
          </div>
          <div tabIndex={1} className="dropdown dropdown-end">
            <div role="button" className="btn btn-ghost btn-circle avatar w-12 h-12">
              <div className="w-10 rounded-xl">
                <svg className="fill-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                  <g id="UrTavla">
                    <circle  cx="250" cy="250" r="245">
                    </circle>
                    <text className="fill-white font-Italianno" x="50%" y="80%" textAnchor="middle" fontSize="500">{letra}</text>
                  </g>
                </svg>
              </div>
            </div>
            <ul
              tabIndex={1}
              className="menu menu-md dropdown-content bg-sky-700 rounded-box z-1 mt-3 p-2 shadow">
              <MenuListItem param={param2}/>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

function MenuListItem(data: {param: MenuListItemParam | undefined}) {

  if(data == undefined) return;
  
  if(data.param == undefined) return;

  return (
    <li onClick={data.param.onclick} className='text-black hover:text-sky-300'>
      <Link href={data.param.href} className="flex flex-row p-1 align-middle cursor-pointer hover:shadow-[inset_0_0_0_2px] rounded duration-100">
        <div className="flex flex-row gap-2 items-center">
          <span className="flex flex-row justify-center">
            {data.param.image}
          </span>
          <span className="align-middle p-1 mt-1">
            {data.param.children}
          </span>
        </div>
      </Link>
    </li>
  );
}
