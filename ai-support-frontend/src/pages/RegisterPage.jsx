import { useState } from "react";
import { registerUser } from "../services/authService";

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser({name, email, password,});
            console.log(data);
            alert("User registered successfully!");
        } catch (error) {
            console.error(error);
            alert("Registration failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">
                <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <input type="text" placeholder="Enter your name" className="border p-3 rounded-lg outline-none" onChange={(e) => setName(e.target.value)}/>

                    <input type="email" placeholder="Enter your email" className="border p-3 rounded-lg outline-none" onChange={(e) => setEmail(e.target.value)}/>

                    <input type="password" placeholder="Enter your password" className="border p-3 rounded-lg outline-none" onChange={(e) => setPassword(e.target.value)}/>

                    <button className="bg-black text-white p-3 rounded-lg hover:opacity-90">Register</button>

                </form>

            </div>

        </div>
    );
}

export default RegisterPage;