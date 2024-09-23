import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db"; // Your Prisma client instance
import authConfig from "./auth.config"; // Your custom config
import { getUserById } from "@/data/user";

// const ONE_YEAR = 365 * 24 * 60 * 60; // 1 year in seconds

// Function to refresh access tokens when they expire
async function refreshAccessToken(token: any) {
  try {
    // Ensure that required environment variables and token values are defined
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret || !token.refreshToken) {
      throw new Error("Missing necessary OAuth credentials or refresh token");
    }

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const url = "https://oauth2.googleapis.com/token?" + params.toString();

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Extend expiration
      refreshToken: refreshedTokens.refresh_token || token.refreshToken, // Reuse existing refresh token if none provided
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
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
    maxAge: 3600, 
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
    async jwt({ token, account,user }: { token: any; account: any,user:any }) {
      if (account) {
        // Set the access token, refresh token, id token, and expiration if available
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
        token.accessTokenExpires = account.expires_at ? account.expires_at * 1000 : Date.now() + 3600 * 1000;
      }
      if (user) {
        const userData = await getUserById(user.id); // Fetch the user from your database
        token.isOnboarded = userData?.isOnboarded; // Add isOnboarded to the token
      }
      if (!token.isOnboarded && token.sub) {
        // Fetch the user from DB if isOnboarded is missing (e.g., on token refresh)
        const userData = await getUserById(token.sub);
        token.isOnboarded = userData?.isOnboarded;
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
