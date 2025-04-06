import CredentialsProvider from "next-auth/providers/credentials";
import { sendUsertoAPI } from "@/app/server/login/actions";
import { instanceOfActionErrors } from "@/app/types/forms";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Account, NextAuthOptions, Profile, Session } from "next-auth";
import { Adapter, AdapterUser } from "next-auth/adapters";

export const nextAuthOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                login: {
                    label: "login",
                    type: "text",
                    placeholder: "Login: <login>@nca.ufma.br",
                },
                password: { label: "Senha", type: "password" },
            },
            authorize: async (credentials) => {
                
                if(!credentials) return null;
                
                try {

                    const user_login: Omit<User, 'id' | 'name' | 'email' | 'profile'> = {login: credentials.login, password: credentials.password}
                    
                    const user = await sendUsertoAPI(user_login);
                    
                    if(instanceOfActionErrors(user))
                    return null;

                    console.log(user);

                    return user;

                } catch(error) {
                    console.log(JSON.stringify(error)); 
                    return null;
                }
            },
        }),
    ],
    callbacks: {
      async session({ session, token}:{session: Session, token: JWT}) {
        if (session.user) {
            session.user.id = token.id as number;
            session.user.login = token.login as string;
            session.user.profile = token.profile as 'A' | 'U' | 'N';
        }
        return session // The return type will match the one returned in `useSession()`
      },
      async jwt({ token, user }:{token: JWT, user: User | AdapterUser}) {

        if (user) {
            token.id = user.id;
            token.login = user.login;
            token.name = user.name;
            token.email = user.email;
            token.profile = user.profile;
        }

        return token
      }
    },
    secret: "chavinha",
    pages: {
      signIn: "/login", 
      error: "/login", 
    },
    session: {
      strategy: "jwt" as const
    },
    jwt: {
      secret: "chavinha",
    },
};