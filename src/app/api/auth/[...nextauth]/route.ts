import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })],
    pages: {
        signIn: 'sign-in',
    },
    secret: process.env.SECRET
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };