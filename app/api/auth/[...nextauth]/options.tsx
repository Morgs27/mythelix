import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/_mongoDB/models/User";
import bcrypt from "bcrypt";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "",
                },
            },
            async authorize(credentials){
                try {
                    const foundUser = await User.findOne({email: credentials.email}).lean().exec();
                    if (foundUser){
                        console.log("Found User: ", foundUser);
                        const match = await bcrypt.compare(credentials.password, foundUser.password);
                        if (match) {
                            console.log("Good Pass");
                            delete foundUser.password;
                            foundUser["role"] = "Unverified Email";
                            return foundUser;
                        }

                    }
                } catch (error){
                    console.log(error);
                }
                return null;
            }
        }),
        GitHubProvider({
            profile(profile){
                console.log("Profile Github: ", profile);

                let userRole = "Github User";
                if (profile?.email == "morganjdaniel@gmail.com"){
                    userRole = "Admin";
                }

                return {
                    ...profile, 
                    role: userRole,
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);

                let userRole = "Google User";

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
      
    ],
    callbacks: {
        async jwt({token, user}){
            if (user) token.role = user.role;
            return token;
        },
        async session({session, token}){
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
}