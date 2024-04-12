import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { auth, db } from '../../../../../firebase';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
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
        async jwt({ token, user, session, profile }) {
            try {
                if (user) {
                    token.uid = user.uid;
                }
                return token;

            } catch (error) {
                console.error(error)
            }
            return token;
        },
        async session({ session, token }) {
            try {
                if (session.user) {
                    const username = session.user?.email?.slice(0, session.user?.email.indexOf('@'));
                    session.user.username = username
                    const userQuery = query(collection(db, "users"), where("uid", "==", session.user.uid));
                    const userDocs = await getDocs(userQuery);
                    if (userDocs.empty) {
                        session.user.uid = token.sub ?? token.uid as string;
                        await addDoc(collection(db, "users"), {
                            username, 
                            uid: session.user.uid,
                            email: session.user.email,
                            profileImage: session.user.image ?? null
                        });
                    }
                }

            } catch (error) {
                console.error(error)
            }
            return session;
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
