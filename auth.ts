import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.idToken = token.idToken;  // Include id_token in the session
      }
      return session;
    },
    async jwt({ token, account }) {
      // If the account exists, it means the user just logged in
  
      if (account) {
        token = {
          ...token,
          idToken: account.id_token, // Set the new id_token
        };
      }

      // Fetch the id_token from the database if it exists
      if (!token.idToken) {
        const prismaAccount = await db.account.findFirst({
          where: {
            provider: account?.provider || "google",
            providerAccountId: account?.providerAccountId || token.sub,
          },
        });

        if (prismaAccount && prismaAccount.id_token) {
          token.idToken = prismaAccount.id_token;
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
