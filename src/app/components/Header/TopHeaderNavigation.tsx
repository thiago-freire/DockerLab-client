"use client";
import "client-only";
//Import Icones

import {useEffect, useRef, useState} from "react";
import styles from "@/app/components/Header/Sidebar.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, getSession } from "next-auth/react";
import packageJson from "@/app/../../package.json";
import { User } from "@/app/types/types";

export default function HeaderMenu() {

  const [user, setUser] = useState<User>();


  const router = useRouter()

  async function handleLogout() {
    await signOut({ redirect: false })
    router.push("/login");
  }

  useEffect(() =>{

    const verifySession = async () => {
        return await getSession();
    }

    verifySession().then((session)=>{
        if (!session) {
            router.push("/login", {scroll: false});
        }else{

            const user: User = {name: session.user?.name,
                                email: session.user?.email,
                                imagem: session.user?.image,
                                profile: null};

            setUser(user);
        }
    });
    
},[]);

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
              <MenuListItem
                image={<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0 -1.07-.48l-1.88.38a1 1 0 0 1 -1.15-.66l-.61-1.83a1 1 0 0 0 -.95-.68h-4a1 1 0 0 0 -1 .68l-.56 1.83a1 1 0 0 1 -1.15.66l-1.93-.38a1 1 0 0 0 -1 .48l-2 3.46a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32l-1.27 1.44a1 1 0 0 0 -.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0 -.12-1.17zm-1.49 1.34.8.9-1.28 2.22-1.18-.24a3 3 0 0 0 -3.45 2l-.38 1.12h-2.56l-.36-1.14a3 3 0 0 0 -3.45-2l-1.18.24-1.3-2.21.8-.9a3 3 0 0 0 0-4l-.8-.9 1.28-2.2 1.18.24a3 3 0 0 0 3.45-2l.38-1.13h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24 1.28 2.22-.8.9a3 3 0 0 0 0 3.98zm-6.77-6a4 4 0 1 0 4 4 4 4 0 0 0 -4-4zm0 6a2 2 0 1 1 2-2 2 2 0 0 1 -2 2z"/>
                          </svg>}
                href="#"
                alt="Configurações"
              >
                Configurações
              </MenuListItem>
            </ul>
          </div>
        </div>
        <div className='navbar-end'>
          <div className="flex flex-col">
            <div className='mx-4'>Olá {user?.name}</div>
            <div className='mx-4 text-xs text-gray-400'>{user?.email}</div>
          </div>
          <div tabIndex={1} className="dropdown dropdown-end">
            <div role="button" className="btn btn-ghost btn-circle avatar w-12 h-12">
              <div className="w-11 h-11 rounded-full">
                <img
                  alt={user?.email!}
                  src={user?.imagem!} />
              </div>
            </div>
            <ul
              tabIndex={1}
              className="menu menu-md dropdown-content bg-sky-700 rounded-box z-1 mt-3 p-2 shadow">
              <MenuListItem
                  image={<svg className={styles.svg_icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="m22 6.62219v10.62281c0 1.1129-.7143 2.2258-1.8367 2.6304l-5.1021 1.9223c-.3061.1011-.6122.2023-1.0204.2023-.5102 0-1.1224-.2023-1.6326-.5058-.2041-.2024-.5102-.4047-.6123-.6071h-3.87753c-1.53061 0-2.85715-1.214-2.85715-2.8327v-1.0117c0-.4047.30613-.8094.81633-.8094.51021 0 .81633.3035.81633.8094v1.0117c0 .7082.61224 1.214 1.22449 1.214h3.36733v-14.56843h-3.36733c-.71429 0-1.22449.50585-1.22449 1.21404v1.01169c0 .40468-.30612.80936-.81633.80936-.5102 0-.81633-.40468-.81633-.80936v-1.01169c0-1.51755 1.2245-2.83276 2.85715-2.83276h3.87753c.2041-.20234.4082-.40468.6123-.60702.8163-.50585 1.7347-.60702 2.653-.30351l5.1021 1.92223c1.0204.30351 1.8367 1.41638 1.8367 2.52924z"/>
                              <path d="m4.85714 14.8169c-.20408 0-.40816-.1011-.5102-.2023l-2.04082-2.0234c-.10204-.1012-.10204-.2023-.20408-.2023 0-.1012-.10204-.2024-.10204-.3035 0-.1012 0-.2024.10204-.3035 0-.1012.10204-.2024.20408-.2024l2.04082-2.02338c.30612-.30351.81633-.30351 1.12245 0s.30612.80938 0 1.11288l-.71429.7082h4.18368c.40816 0 .81632.3035.81632.8093 0 .5059-.40816.6071-.81632.6071h-4.28572l.71429.7081c.30612.3035.30612.8094 0 1.1129-.10204.1012-.30613.2023-.51021.2023z"/>
                            </svg>}
                  size="28px"
                  href="#"
                  onclick={() => {handleLogout(); }}
                  alt="Sair"
              >
                Sair
              </MenuListItem>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

function MenuListItem({ image, href, children, onclick}: any) {
  return (
    <li onClick={onclick} className='text-black hover:text-sky-300'>
      <Link href={href} className="flex flex-row p-1 align-middle cursor-pointer hover:shadow-[inset_0_0_0_2px] rounded duration-100">
        <div className="flex flex-row gap-2 items-center">
          <span className="flex flex-row justify-center">
            {image}
          </span>
          <span className="align-middle p-1 mt-1">
            {children}
          </span>
        </div>
      </Link>
    </li>
  );
}
