
declare module "next-auth" {
  
  export interface User {
    id: number,
    login: string,
    name: string,
    email: string,
    password: string,
    profile: 'A' | 'U' | 'N'
  }

  export interface Session {
    user: User & DefaultSession["user"]
  }
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