import NextAuth from "next-auth";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email }).lean();
                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    ); 
                    if (!isValidPassword) {
                        throw new Error ("")
                    }
                    return {
                        id: user._id.toString(), // Chuyển _id thành chuỗi
                        email: user.email,
                        name: user.name,
                      };
                }
                catch {
                    return null
                }
            }
        })

    ],

    pages: {
       signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET
    

  
});
export { handler as GET, handler as POST };
