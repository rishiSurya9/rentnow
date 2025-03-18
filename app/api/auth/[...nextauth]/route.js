import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [{ email: "user@example.com", password: "password123" }];
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

        if (user) return user;
        throw new Error("Invalid email or password");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: "1234",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
