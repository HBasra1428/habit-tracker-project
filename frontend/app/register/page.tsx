"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api"; // adjust the path to your axios file

const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("register/", {
                username,
                email,
                password,
            });

            alert("Registration successful!");
            router.push("/login");
        } catch (err: any) {
            const data = err.response?.data;
            if (data?.username) {
                setError(`Username: ${data.username[0]}`);
            } else if (data?.email) {
                setError(`Email: ${data.email[0]}`);
            } else if (data?.password) {
                setError(`Password: ${data.password[0]}`);
            } else {
                setError("Registration failed. Please check your info.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#00e2a2] to-[#1f8bfe] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-2xl font-bold mb-6 text-center text-black">
                            Create a new account
                        </h2>
                        <p className="my-4 text-center text-sm text-gray-600">
                            or{" "}
                            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                sign in to your account
                            </a>
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Choose a username"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Choose a password"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Creating account..." : "Sign up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
