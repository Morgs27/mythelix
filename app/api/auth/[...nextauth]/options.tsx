import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/_mongoDB/models/User";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/_mongoDB/connect";
import { NextResponse } from "next/server";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username:",
                    type: "text",
                    placeholder: "username",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password",
                },
            },
            // @ts-ignore
            async authorize(credentials: {username: string, password: string}){

                let error = "server";

                try {

                    connectDB();

                    const foundUser = await User.findOne({username: credentials.username}).lean().exec() as any;

                    if (foundUser){

                        const match = await bcrypt.compare(credentials.password, foundUser.password);

                        if (match) {

                            delete foundUser.password;

                            return foundUser;
                        }
                        else {

                            error = "password&username=" + credentials.username
 
                        }

                    }else {

                       error = "username"

                    }

                } catch (error){
                    console.log(error);
                }

                throw new Error(error);
                
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}: {token: any, user: any}){

            if (user) token.user = user;

            return token;
        },
        async session({session, token}: {session: any, token: any}){
            if (token) {
                session.user = token.user
            }
            return session;
        }
    },
    pages: {
        signIn: "../../../auth/signin",
        signOut: "../../../auth/signout",
        error: "../../../auth/signin",
    }
}
