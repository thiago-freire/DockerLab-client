import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sendUsertoAPI } from "@/app/server/login/actions";
import { User } from "@/app/types/objects";
import { instanceOfActionErrors } from "@/app/types/forms";

const nextAuthOptions = {
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
            
          try {

            if(credentials){
              
              const user_login: Omit<User, 'id' | 'name' | 'email' | 'profile'> = {login: credentials.login, password: credentials.password}
              
              const user = await sendUsertoAPI(user_login);
              
              console.log(user);

              if(instanceOfActionErrors(user))
                return null;

              return user;
            }

          } catch(error) {
            console.log(JSON.stringify(error)); 
            return null;
          }
        },
      }),
      
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    secret: "chavinha",
    pages: {
      signIn: "/login", 
      error: "/login", 
    },
    jwt: {
      secret: "chavinha",
    },
  };

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
