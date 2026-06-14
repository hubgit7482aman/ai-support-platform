import { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const data = await loginUser({
                email,
                password,
            });

            console.log(data);

            localStorage.setItem("token", data.token);

            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Invalid credentials!");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-6 py-10">

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SECTION */}

                <div className="bg-black text-white p-10 flex flex-col justify-center">

                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            AI Support Platform
                        </h1>

                        <p className="text-gray-300 mt-5 text-lg leading-8">
                            Build intelligent AI-powered customer support systems
                            for modern businesses and startups.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col gap-5">

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                Multi Business AI Workspace
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                Persistent Real-Time Conversations
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                AI Knowledge Base Integration
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                Secure JWT Authentication
                            </p>
                        </div>

                    </div>

                </div>

                {/* RIGHT SECTION */}

                <div className="p-8 md:p-12 flex flex-col justify-center">

                    <div className="mb-8">

                        <h2 className="text-4xl font-extrabold text-black">
                            Login
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Access your AI-powered business workspace
                        </p>

                    </div>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleLogin}
                    >

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                        />

                        <button
                            disabled={loading}
                            className="bg-black text-white p-4 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 font-semibold cursor-pointer"
                        >
                            {loading ? "Signing In..." : "Login"}
                        </button>

                    </form>

                    <p className="text-gray-500 mt-6 text-center">

                        Don’t have an account?{" "}

                        <Link
                            to="/register"
                            className="text-black font-semibold hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;