import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const data = await registerUser({
                name,
                email,
                password,
            });

            console.log(data);

            alert("User registered successfully!");

            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-6">

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">

                {/* LEFT SECTION */}

                <div className="bg-black text-white p-10 flex flex-col justify-center">

                    <div className="mb-8">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            AI Support Platform
                        </h1>

                        <p className="text-gray-300 mt-5 text-lg leading-8">
                            Build AI-powered customer support systems for modern businesses.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 mt-6">

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                AI Knowledge Base Integration
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                Multi Business AI Workspace
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <p className="text-gray-200">
                                Real-Time AI Conversations
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

                <div className="p-10 flex flex-col justify-center">

                    <div className="mb-8">
                        <h2 className="text-4xl font-extrabold text-black">
                            Register
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Create your AI-powered business workspace
                        </p>
                    </div>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleRegister}
                    >

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            disabled={loading}
                            className="bg-black text-white p-4 rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 font-semibold cursor-pointer"
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </button>

                    </form>

                    <p className="text-gray-500 mt-6 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-black font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default RegisterPage;