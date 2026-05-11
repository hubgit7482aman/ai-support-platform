import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({email, password,});
            console.log(data);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <input type="email" placeholder="Enter your email" className="border p-3 rounded-lg outline-none" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" className="border p-3 rounded-lg outline-none" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="bg-black text-white p-3 rounded-lg hover:opacity-90">Login</button>
                </form>

            </div>
        </div>
    );
}

export default LoginPage;