import NextAuth from "next-auth/next";
import { User as NextUser } from "next-auth";
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
        if (credentials == null) return null;

        const { user } = await signIn(
          credentials.username,
          credentials.password
        );
        if (user) {
          const nextUser: NextUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };
          return nextUser;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
