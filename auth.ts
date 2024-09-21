import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"; // Your Prisma client instance
import authConfig from "./auth.config"; // Your custom config

const ONE_YEAR = 365 * 24 * 60 * 60; // 1 year in seconds

// Function to refresh access tokens when they expire
async function refreshAccessToken(token: any) {
  try {
    // Add logic to refresh the access token (this depends on your auth provider)
    return {
      ...token,
      accessToken: "newAccessToken", // Replace with refreshed token
      accessTokenExpires: Date.now() + ONE_YEAR * 1000, // Extend expiration
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: ONE_YEAR, // Set session max age to 1 year
  },
  callbacks: {
    // Session callback, attaches necessary fields to session
    async session({ session, token }: { session: any; token: any }) {
      if (token.sub) {
        session.user.id = token.sub ?? ""; // Default empty string if undefined
      }
      session.idToken = token.idToken;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
    // JWT callback, manages JWT tokens
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        // Set the access token, refresh token, id token, and expiration if available
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : Date.now() + ONE_YEAR * 1000;
      }

      // If the access token hasn't expired, return the current token
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // If the token is expired, attempt to refresh it
      return await refreshAccessToken(token);
    },
  },
  ...authConfig, // Additional authentication configuration
});
