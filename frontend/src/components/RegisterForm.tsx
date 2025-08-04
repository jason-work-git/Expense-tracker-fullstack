"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data: ApiResponse = await res.json();
            if (res.ok) {
                setMessage("Registration successful! Redirecting to login...");
                setTimeout(() => router.push("/auth/login"), 2000);
            } else {
                setMessage(data.message || "Registration failed");
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
    <div>
        <label htmlFor="username" className="block text-sm font-medium ">
        Username
        </label>
        <input
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
        Password
        </label>
        <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
    />
    </div>
    <button
    type="submit"
    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
        Register
        </button>
        </form>
    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-500 hover:underline">
        Login
        </a>
        </p>
        </div>
    );
    }