"use client";
import "client-only";
//Import Icones

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
      if(session && session.user)
        console.log(session.user);
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
    ]

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

  },[])

  return (
    <>
      <div className={styles.header_bar}>
        {/* <div ref={menuRef} className="pl-1 space-y-1 cursor-pointer relative z-50"
              onClick={() => toggleMenu()}>
            <div className="block w-8 bg-white h-1 transition-transform duration-300 origin-center"></div>
            <div className="block w-8 bg-white h-1 transition-opacity duration-100"></div>
            <div className="block w-8 bg-white h-1 transition-transform duration-300 origin-center"></div>
        </div> */}
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
            </ul>
          </div>
        </div>
        <div className='navbar-end'>
          <div className="flex flex-col">
            <div className='mx-4'>{user?.name}</div>
            <div className='mx-4 text-xs text-gray-400'>{user?.email}</div>
          </div>
          <div tabIndex={1} className="dropdown dropdown-end">
            <div role="button" className="btn btn-ghost btn-square rounded-xl avatar w-12 h-12">
              <div className="w-11 rounded-xl">
                <svg className="fill-green-500 w-11 h-11" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <g>
                    <path d="M162.592,147.193c0,0,56.607,11.331,130.198-62.272c33.969,45.3,56.63,67.938,56.63,67.938v67.96
                      c22.727-23.44,36.795-55.36,36.795-90.598C386.215,58.298,327.917,0,255.994,0c-71.9,0-130.198,58.298-130.198,130.221
                      c0,35.238,14.046,67.157,36.795,90.598V147.193z"/>
                    <path d="M343.32,297.426c-9.137,4.996-87.325,176.655-87.325,176.655s-78.176-171.658-87.326-176.655
                      C80.654,329.18,76.724,400.311,76.724,512h358.552C435.276,400.311,431.347,329.18,343.32,297.426z"/>
                    <polygon points="217.017,289.757 217.017,341.733 255.994,328.478 294.982,341.733 294.982,289.757 255.994,303.013 	
                      "/>
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
