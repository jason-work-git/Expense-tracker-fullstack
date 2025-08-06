"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BASE_URL} from "../../../../config-global";

interface ApiResponse {
    message: string;
}

export default function RegisterForm() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch(`${BASE_URL}auth/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });
            const data = await res.json() as ApiResponse;
            if (res.ok) {
                setMessage("Registration successful! Redirecting to login...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center px-9">
            <div className="w-full p-6 border rounded-lg ">
                <h2 className="text-2xl font-bold mb-6 text-center">ثبت نام</h2>
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        ثبت نام
                    </Button>
                </form>
                {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                <p className="mt-4 text-center">
                    حساب کاربری دارید؟{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        ورود
                    </a>
                </p>
            </div>
        </div>
    );
}