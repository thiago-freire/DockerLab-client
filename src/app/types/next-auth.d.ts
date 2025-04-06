import { JWT } from "next-auth/jwt";

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
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: User,
        idToken?: string
    }
};