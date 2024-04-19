import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // interface DefaultSession {
  //   username: string
  //   uid: string
  // }

  interface Session {
    user: {
      /** The user's postal address. */
      username?: string
      uid?: string
      biography: string
      site: string
    } & DefaultSession["user"]
  }

  interface User {
    uid: string
  }
}