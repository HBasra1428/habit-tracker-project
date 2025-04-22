import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";

const LoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");  // changed from 'email' to 'username'
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            
            // changed the api from token to login, as we will be using login here. Another change i've done is used username instead of email.
            //  email is optional, just use username for authentication.
            const res = await api.post("login/", {
                username,  
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

            alert("Login successful!");
            router.push("/");
        } catch (err: any) {
            console.error("Login error:", err);
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
                    type="text"  // changed from email to text for username
                    placeholder="Username"
                    className="w-full p-3 mb-4 mt-4 border border-gray-300 rounded text-gray-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}  // Updating 'username' here
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