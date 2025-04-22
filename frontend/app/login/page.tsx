"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("token/", {
                email,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            alert("Login successful!");
            router.push("/"); // Redirect to home or dashboard
        } catch (err: any) {
            const msg = err.response?.data?.detail || "Login failed";
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#00e2a2] to-[#1f8bfe]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-3 text-center text-black">Sign in</h2>
                <p className="my-4 text-center text-sm text-gray-600">
                    or{" "}
                    <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        register account
                    </a>
                </p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 mt-4 border border-gray-300 rounded text-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border border-gray-300 rounded text-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
