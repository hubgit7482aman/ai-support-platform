import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getBusinessById, updateBusiness} from "../services/businessService";
import ReactMarkdown from "react-markdown";

function KnowledgeBasePage() {

    const navigate = useNavigate();
    const { businessId } = useParams();
    const [business, setBusiness] = useState(null);
    const [editing, setEditing] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [industry, setIndustry] = useState("");
    const [description, setDescription] = useState("");
    const [businessInfo, setBusinessInfo] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchBusiness = async () => {
            try {
                const data = await getBusinessById(businessId);
                setBusiness(data);
                setBusinessName(data.businessName);
                setIndustry(data.industry);
                setDescription(data.description);
                setBusinessInfo(data.businessInfo);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBusiness();
    }, [businessId]);

    const handleUpdateKnowledgeBase = async () => {
            try {
                setLoading(true);
                const updatedBusiness = await updateBusiness(businessId, {businessName, industry, description, businessInfo,});
                const refreshedBusiness = await getBusinessById(businessId);

                setBusiness(refreshedBusiness);
                setEditing(false);
                alert("Knowledge Base updated successfully!");
            } catch (error) {
                console.error(error);
                alert("Failed to update Knowledge Base");
            } finally {
                setLoading(false);
            }
        };

    if (!business) {
        return (
            <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
                Loading Knowledge Base...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="border border-black px-5 py-2 rounded-xl hover:bg-black hover:text-white transition"
                    >
                        Back to Dashboard
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-green-600 font-medium">
                            AI Knowledge Active
                        </span>

                        {!editing ? (

                            <button
                                onClick={() =>
                                    setEditing(true)
                                }
                                className="bg-black text-white px-5 py-2 rounded-xl"
                            >
                                Edit Knowledge Base
                            </button>

                        ) : (

                            <button
                                onClick={
                                    handleUpdateKnowledgeBase
                                }
                                disabled={loading}
                                className="bg-black text-white px-5 py-2 rounded-xl disabled:opacity-50"
                            >
                                {
                                    loading
                                        ? "Saving..."
                                        : "Save Changes"
                                }
                            </button>
                        )}

                    </div>

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-10">

                    <div className="mb-10">

                        {
                            editing
                                ? (
                                    <input
                                        type="text"
                                        value={businessName}
                                        onChange={(e) =>
                                            setBusinessName(
                                                e.target.value
                                            )
                                        }
                                        className="text-4xl font-bold w-full border p-4 rounded-2xl"
                                    />
                                )
                                : (<h1 className="text-5xl font-bold mb-3">{business.businessName}</h1>)
                        }

                        {
                            editing
                                ? (
                                    <input
                                        type="text"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                        className="mt-4 text-lg w-full border p-4 rounded-2xl"
                                    />
                                )
                                : (
                                    <p className="text-xl text-gray-600">{business.industry}</p>
                                )
                        }

                    </div>

                    <div className="mb-10 bg-gray-50 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-5">Business Overview</h2>
                        {
                            editing
                                ? (
                                    <textarea
                                        rows="5"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="w-full border p-5 rounded-2xl"
                                    />
                                )
                                : (
                                    <p className="text-gray-700 leading-9 text-lg">
                                        {business.description}
                                    </p>
                                )
                        }

                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-3xl font-bold">

                                AI Knowledge Base

                            </h2>

                            <span className="text-sm text-gray-500">

                                Used by AI Assistant

                            </span>

                        </div>

                        {
                            editing
                                ? (
                                    <textarea
                                        rows="18"
                                        value={businessInfo}
                                        onChange={(e) =>
                                            setBusinessInfo(
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-5 rounded-2xl leading-8"
                                    />
                                )
                                : (
                                    <div className="bg-white p-6 rounded-2xl border">
                                        <div className="prose prose-lg max-w-none prose-headings:font-bold">
                                            <ReactMarkdown>
                                                {business.businessInfo}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default KnowledgeBasePage;