import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/connect";
import PatientSc from "@/app/models/patient/patientSch";
import User from "../models/user/userSc";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDB();

        const user = await User.findOne({ "email": email });
        if (!user) {
          console.error("User not found for email:", email);
          throw new Error("User not found");
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password,
        );
        if (!passwordsMatch) {
          console.error("Passwords do not match for user:", email);
          throw new Error("Incorrect password");
        }

        return user.toObject(); 
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Spread the entire user object into the token
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // Spread the entire token which includes user details into the session
      session.user = { ...token };
      return session;
    },
  },
};
