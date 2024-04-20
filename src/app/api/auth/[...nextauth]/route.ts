import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
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
                            console.log(userCredential.user)
                            
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
                    const username = session?.user?.email?.split('@')[0];
                    const userQuery = query(collection(db, "users"), where("email", "==", session.user?.email));
                    const userDocs = await getDocs(userQuery);
                    
                    if (userDocs.empty) {
                        await addDoc(collection(db, "users"), {
                            username,
                            uid: session.user.uid,
                            email: session.user.email,
                            profileImage: session.user.image ?? null,
                            createdAt: serverTimestamp()
                        });
                        session.user.username = username;
                        session.user.uid = token.sub ?? token.uid as string;
                        return session;
                    }
                    
                    const userInfo = userDocs.docs[0].data();
                    session.user.username = userInfo.username;
                    session.user.name = userInfo.name;
                    session.user.biography = userInfo.biography;
                    session.user.site = userInfo.website;

                    session.user.uid = token.sub ?? token.uid as string;
                }
                // console.log(user)
                
            } catch (error) {
                console.error({error})
            }
            return session;
        },

    },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
