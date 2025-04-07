import { DefaultSession } from "next-auth"

declare module "next-auth" {
  
  interface User {
    id: number | string,
    login: string,
    name: string,
    email: string,
    password: string,
    profile: 'A' | 'U' | 'N'
  }

  export interface Session {
    user: User | undefined & DefaultSession['user']
  }

  // export interface DefaultSession {
  //   user?: {
  //     id: number,
  //     login: string,
  //     name: string,
  //     email: string,
  //     password: string,
  //     profile: 'A' | 'U' | 'N'
  //   }
  // }
};

declare module "next-auth/jwt" {

    export interface JWT {
        id: number | string,
        login: string,
        name: string,
        email: string,
        password: string,
        profile: 'A' | 'U' | 'N'
    }
};