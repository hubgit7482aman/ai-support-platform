import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createBusiness,
    getMyBusinesses,
    updateBusiness,
    getBusinessById,
    deleteBusiness,
} from "../services/businessService";

function DashboardPage() {

    const navigate = useNavigate();

    const [businessName, setBusinessName] = useState("");
    const [industry, setIndustry] = useState("");
    const [description, setDescription] = useState("");
    const [businessInfo, setBusinessInfo] = useState("");

    const [businesses, setBusinesses] = useState([]);

    const [editingBusinessId, setEditingBusinessId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [activeMenu, setActiveMenu] = useState(null);

    const fetchBusinesses = async () => {

        try {

            const data = await getMyBusinesses();

            setBusinesses(data);

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        fetchBusinesses();

    }, []);

    const resetForm = () => {

        setBusinessName("");
        setIndustry("");
        setDescription("");
        setBusinessInfo("");

        setEditingBusinessId(null);
    };

    const handleCreateBusiness = async (e) => {

        e.preventDefault();
        if (!businessName || !industry || !description || !businessInfo) {
            alert("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            if (editingBusinessId) {
                await updateBusiness(
                    editingBusinessId,
                    {
                        businessName, industry, description, businessInfo,
                    }
                );
                alert("Business updated successfully!");
            } else {
                await createBusiness({businessName, industry, description, businessInfo,});
                alert("Business created successfully!");
            }
            await fetchBusinesses();
            resetForm();
        } catch (error) {
            //console.error(error);
            console.log(error.response.data);
            alert("Operation failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleEditBusiness = async (businessId) => {

        try {

            const business =
                await getBusinessById(
                    businessId
                );

            setBusinessName(
                business.businessName
            );

            setIndustry(
                business.industry
            );

            setDescription(
                business.description
            );

            setBusinessInfo(
                business.businessInfo
            );

            setEditingBusinessId(
                business.id
            );

            setActiveMenu(null);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        } catch (error) {

            console.error(error);
        }
    };

    const handleDeleteBusiness = async (businessId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this business?"
        );

        if (!confirmDelete) return;

        try {

            await deleteBusiness(
                businessId
            );

            setBusinesses((prev) =>
                prev.filter(
                    (business) =>
                        business.id !== businessId
                )
            );

            if (
                editingBusinessId === businessId
            ) {
                resetForm();
            }

            setActiveMenu(null);

            alert(
                "Business deleted successfully"
            );

        } catch (error) {

            console.error(error);

            console.log(error.response);

            alert(
                "Failed to delete business"
            );
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}

            <div className="bg-black text-white px-6 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">

                <div>

                    <h1 className="text-3xl font-extrabold">
                        AI Support Workspace
                    </h1>

                    <p className="text-gray-300 text-sm mt-1">
                        Manage your AI powered businesses
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                    Logout
                </button>

            </div>

            <div className="max-w-7xl mx-auto px-5 py-10">

                {/* HERO SECTION */}

                <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-8 shadow-xl mb-10">

                    <h2 className="text-4xl font-extrabold leading-tight">
                        Build AI Assistants
                        <br />
                        For Modern Businesses
                    </h2>

                    <p className="text-gray-300 mt-5 text-lg max-w-2xl">
                        Create custom AI support workspaces,
                        manage business knowledge bases,
                        and deploy intelligent assistants.
                    </p>

                    <div className="flex gap-6 mt-8 flex-wrap">

                        <div className="bg-white/10 px-5 py-4 rounded-2xl">

                            <p className="text-3xl font-bold">
                                {businesses.length}
                            </p>

                            <p className="text-gray-300 text-sm">
                                Businesses
                            </p>

                        </div>

                        <div className="bg-white/10 px-5 py-4 rounded-2xl">

                            <p className="text-3xl font-bold">
                                AI Ready
                            </p>

                            <p className="text-gray-300 text-sm">
                                Smart Workspace
                            </p>

                        </div>

                    </div>

                </div>

                {/* FORM */}

                <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-3xl font-extrabold">

                            {editingBusinessId
                                ? "Edit Business"
                                : "Create Business"}

                        </h2>

                        {editingBusinessId && (

                            <button
                                onClick={resetForm}
                                className="border border-black px-5 py-2 rounded-xl hover:bg-black hover:text-white transition cursor-pointer"
                            >
                                Cancel Editing
                            </button>
                        )}

                    </div>

                    <form
                        className="flex flex-col gap-5"
                        onSubmit={handleCreateBusiness}
                    >

                        <input
                            type="text"
                            placeholder="Business Name"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
                            value={businessName}
                            onChange={(e) =>
                                setBusinessName(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="text"
                            placeholder="Industry"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
                            value={industry}
                            onChange={(e) =>
                                setIndustry(
                                    e.target.value
                                )
                            }
                        />

                        <textarea
                            placeholder="Business Description"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
                            rows="4"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />

                        <textarea
                            placeholder="Business Information For AI"
                            className="border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
                            rows="8"
                            value={businessInfo}
                            onChange={(e) =>
                                setBusinessInfo(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            disabled={loading}
                            className="bg-black text-white p-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                        >

                            {loading
                                ? "Processing..."
                                : editingBusinessId
                                    ? "Update Business"
                                    : "Create Business"}

                        </button>

                    </form>

                </div>

                {/* BUSINESS SECTION */}

                <div>

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-4xl font-extrabold">
                            My Businesses
                        </h2>

                        <p className="text-gray-500">
                            {businesses.length} total businesses
                        </p>

                    </div>

                    {businesses.length === 0 ? (

                        <div className="bg-white rounded-3xl p-12 text-center shadow-lg">

                            <h3 className="text-2xl font-bold mb-3">
                                No Businesses Yet
                            </h3>

                            <p className="text-gray-500">
                                Create your first AI business workspace.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {businesses.map((business) => (

                                <div
                                    key={business.id}
                                    className="bg-white p-7 rounded-3xl border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
                                >

                                    {/* THREE DOT MENU */}

                                    <div className="absolute top-5 right-5 z-50">

                                        <button
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                setActiveMenu(
                                                    activeMenu === business.id
                                                        ? null
                                                        : business.id
                                                );
                                            }}
                                            className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center text-xl cursor-pointer"
                                        >
                                            ⋮
                                        </button>

                                        {activeMenu === business.id && (

                                            <div
                                                className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl w-52 overflow-hidden"
                                            >

                                                <button
                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        handleEditBusiness(
                                                            business.id
                                                        );
                                                    }}
                                                    className="w-full text-left px-5 py-4 hover:bg-gray-100 transition cursor-pointer"
                                                >
                                                    Edit Business
                                                </button>

                                                <button
                                                    onClick={(e) => {

                                                        e.stopPropagation();

                                                        handleDeleteBusiness(
                                                            business.id
                                                        );
                                                    }}
                                                    className="w-full text-left px-5 py-4 text-red-600 hover:bg-red-50 transition cursor-pointer"
                                                >
                                                    Delete Business
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                    {/* BUSINESS CONTENT */}

                                    <h3 className="text-3xl font-extrabold mb-3 pr-10">
                                        {business.businessName}
                                    </h3>

                                    <p className="text-gray-500 font-medium mb-4">
                                        {business.industry}
                                    </p>

                                    <p className="text-gray-700 leading-8 min-h-[90px]">
                                        {business.description}
                                    </p>

                                    <div className="flex justify-between items-center mt-8 flex-wrap gap-4">

                                        <span className="text-green-600 font-semibold">
                                            AI Assistant Ready
                                        </span>

                                        <div className="flex gap-3 flex-wrap">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/chat/${business.id}`
                                                    )
                                                }
                                                className="bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition cursor-pointer"
                                            >
                                                Open Chat
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/knowledge-base/${business.id}`
                                                    )
                                                }
                                                className="border border-black px-5 py-3 rounded-xl hover:bg-black hover:text-white transition cursor-pointer"
                                            >
                                                Knowledge Base
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;