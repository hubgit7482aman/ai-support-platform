import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBusiness } from "../services/businessService";

function DashboardPage() {

    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");
    const [industry, setIndustry] = useState("");
    const [description, setDescription] = useState("");
    const [businessInfo, setBusinessInfo] = useState("");

    const handleCreateBusiness = async (e) => {
        e.preventDefault();
        try {
            const data = await createBusiness({businessName, industry, description, businessInfo,});
            console.log(data);
            alert("Business created successfully!");
        } catch (error) {
            console.error(error);
            alert("Business creation failed!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">AI Support Dashboard</h1>
                <button onClick={handleLogout} className="bg-white text-black px-4 py-2 rounded-lg">Logout</button>
            </div>

            <div className="p-10 flex justify-center">
                <div className="bg-white p-9 rounded-2xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold mb-6">Create Business</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleCreateBusiness}>

                        <input type="text" placeholder="Business Name" className="border p-3 rounded-lg" value={businessName} onChange={(e) => setBusinessName(e.target.value)}/>
                        <input type="text" placeholder="Industry" className="border p-3 rounded-lg" value={industry} onChange={(e) => setIndustry(e.target.value)}/>

                        <textarea placeholder="Description" className="border p-3 rounded-lg" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <textarea placeholder="Business Information For AI" className="border p-3 rounded-lg" rows="6" value={businessInfo} onChange={(e) => setBusinessInfo(e.target.value)}/>
                        <button className="bg-black text-white p-3 rounded-lg">Create Business</button>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default DashboardPage;