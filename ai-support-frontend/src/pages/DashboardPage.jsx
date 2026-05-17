import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBusiness } from "../services/businessService";
import { getMyBusinesses } from "../services/businessService";

function DashboardPage() {

    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");
    const [industry, setIndustry] = useState("");
    const [description, setDescription] = useState("");
    const [businessInfo, setBusinessInfo] = useState("");
    const [businesses, setBusinesses] = useState([]);

    const handleCreateBusiness = async (e) => {
        e.preventDefault();
        try {
            const data = await createBusiness({businessName, industry, description, businessInfo,});
            console.log(data);
            const updatedBusinesses = await getMyBusinesses();
            setBusinesses(updatedBusinesses);
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

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const data = await getMyBusinesses();
                setBusinesses(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBusinesses();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">AI Support Dashboard</h1>
                <button onClick={handleLogout} className="bg-white text-black px-4 py-2 rounded-lg">Logout</button>
            </div>

            <div className="p-10 flex justify-center">
                <div className="bg-white p-9 rounded-2xl shadow-lg w-full max-w-5xl">
                    <h2 className="text-3xl font-bold mb-6">Create Business</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleCreateBusiness}>

                        <input type="text" placeholder="Business Name" className="border p-3 rounded-lg" value={businessName} onChange={(e) => setBusinessName(e.target.value)}/>
                        <input type="text" placeholder="Industry" className="border p-3 rounded-lg" value={industry} onChange={(e) => setIndustry(e.target.value)}/>

                        <textarea placeholder="Description" className="border p-3 rounded-lg" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <textarea placeholder="Business Information For AI" className="border p-3 rounded-lg" rows="6" value={businessInfo} onChange={(e) => setBusinessInfo(e.target.value)}/>
                        <button className="bg-black text-white p-3 rounded-lg">Create Business</button>

                    </form>
                    <div className="mt-10">
                        <h2 className="text-3xl font-bold mb-6">My Businesses</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {businesses.map((business) => (
                                <div
                                    key={business.id}
                                    className="bg-gray-100 p-6 rounded-2xl border">
                                    <h3 className="text-2xl font-bold mb-2">{business.businessName}</h3>
                                    <p className="text-gray-600 mb-2">{business.industry}</p>
                                    <p className="text-gray-700">{business.description}</p>
                                    <button
                                        onClick={() => navigate(`/chat/${business.id}`)}
                                        className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
                                    >
                                        Open Chat
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;