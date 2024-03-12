import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })],    
    pages: {
        signIn: 'sign-in',
    },
    secret: process.env.SECRET,
    callbacks: {
        async session({session,}) {
            if (session.user) {
                session.user.username = session.user?.name?.split(' ').join('').toLocaleLowerCase();
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };