import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { auth } from '../../../../../firebase';

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!

    }),
    Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password  || '')
        .then(userCredential => {
            if (userCredential) {
                return userCredential.user;
            }
            return null
        })
      }  
    })
 ],    
    pages: {
        signIn: 'sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
           if(user) {
            token.uid = user.uid;
            return token;
           }
           return token

        },
        async session({ session, user, token }) {
            if (session.user) {
                session.user.username = session.user?.email?.slice(0, session.user?.email.indexOf('@'));
                session.user.uid = token.sub ?? (token.uid as string);
            }
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };