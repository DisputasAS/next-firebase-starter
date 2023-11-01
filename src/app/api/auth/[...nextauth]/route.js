import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/../firebase.config";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { user } = await signIn(
          credentials.username,
          credentials.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
