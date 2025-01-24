import { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: NextAuthOptions = {
   providers: [
     GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID!,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
     }),
   ],
   callbacks: {
     async redirect() {
       return '/users'
     },
     async session({ session }): Promise<Session> {
       return session;
     }
   },
   pages: {
     signIn: '/',
   }
};