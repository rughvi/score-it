"use client";

import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event: any) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/admin")
    }
    return (
    <div className="grid items-center min-h-screen p-0 pb-5 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 items-center sm:items-center">
            <div className="text-lg font-medium">
                Sign in
            </div>
            <form onSubmit={handleForm} className="flex flex-col space-y-5">
                <label htmlFor="email">
                    <p>Email</p>
                    <input className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full focus:outline-none focus:bg-white focus:border-black py-1 px-3"
                        onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input className="bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full focus:outline-none focus:bg-white focus:border-black py-1 px-3"
                        onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button className="rounded-full bg-gray-200 border-solid border-2 p-2 w"
                    type="submit">Sign in</button>
            </form>
        </main>       
    </div>);
}