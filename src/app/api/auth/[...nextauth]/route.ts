import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const nextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    callbacks: {

      //{id, login, token, timeSession}
      jwt: async ({ token, user, trigger, session }: any) => {

        if (trigger === "update") {
          if(session.id_deteccao)
            token.id_deteccao = session.id_deteccao;

          if(session.id_scenario)
            token.id_scenario = session.id_scenario;
          
          if(session.base_type)
            token.base_type = session.base_type;
        }
  
        return token;
      },

      session: ({ session, _ }: any) => {
  
        return session;
      },
    },
    secret: "chavinha",
    // pages: {
    //   signIn: "/login", 
    //   error: "/signup", 
    // },
    // jwt: {
    //   secret: "chavinha",
    // },
  };

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
