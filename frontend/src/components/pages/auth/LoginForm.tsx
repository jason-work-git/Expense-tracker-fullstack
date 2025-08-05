"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {BASE_URL} from "../../../../config-global";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface LoginResponse {
    token?: string;
    message?: string;
}

export default function LoginForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        console.log('BASE_URL',BASE_URL)

        try {
            const res = await fetch(`${BASE_URL}auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });
            const data = await res.json() as LoginResponse;
            if (res.ok && data.token) {
                // Set token in HTTP-only cookie
                await fetch("/api/auth/set-token", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({token: data.token}),
                });
                setMessage("Login successful! Redirecting...");
                setTimeout(() => router.push("/profile"), 1000);
            } else {
                setMessage(data.message ?? "Login failed");
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center px-9">
            <div className="w-full p-6 border rounded-lg ">
                <h2 className="text-2xl font-bold mb-6 text-center">ورود</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium ">
                            نام کاربری
                        </label>
                        <Input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium ">
                            رمز عبور
                        </label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full "
                    >
                        ورود
                    </Button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <p className="mt-4 text-center">
                    حساب کاربری ندارید؟{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        ثبت نام کنید
                    </Link>
                </p>
            </div>
        </div>
    );
}