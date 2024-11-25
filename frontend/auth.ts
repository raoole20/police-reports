/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        policeID: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_API_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                policia_id: credentials.policeID,
                contrasena: credentials.password,
              }),
            }
          );

          const resJson = await res.json();

          console.log(resJson)
          if (!resJson) {
            throw new Error("Invalid credentials.");
          }

          return resJson.data;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.access_token;
        token.name = user.name;
        token.apellido = user.apellido;
        token.rango = user.rango;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.apellido = token.apellido;
      session.user.rango = token.rango;
      return session;
    },
  },
});
