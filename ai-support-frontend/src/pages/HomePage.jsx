
import { Link } from "react-router-dom";
import {
    MessageSquare,
    Brain,
    ShieldCheck,
    BarChart3,
    Building2,
    Bot,
    Search,
    Sparkles,
} from "lucide-react";

function HomePage() {

    return (
        <div className="min-h-[85vh] bg-gradient-to-b from-gray-100 to-gray-200 text-black">
            {/* NAVBAR */}
            <nav className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <Bot size={34} />
                    <h1 className="text-3xl font-extrabold tracking-wide">AI Support Platform</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="border border-white px-5 py-2 rounded-xl hover:bg-white hover:text-black transition duration-300 font-semibold">Login</Link>
                    <Link to="/register" className="bg-white text-black px-5 py-2 rounded-xl hover:scale-105 transition duration-300 font-semibold">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

                <div>
                    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm mb-6 shadow-lg">
                        <Sparkles size={18} />
                        AI Powered Multi-Business Support Workspace
                    </div>

                    <h1 className="text-6xl font-black leading-tight mb-8">
                        Build AI Customer Support
                        <span className="block text-gray-500">For Any Business.</span>
                    </h1>

                    <p className="text-xl text-gray-700 leading-9 mb-10">
                        Create intelligent AI assistants for gyms, cafes,
                        agencies, eCommerce platforms, educational startups,
                        and modern businesses. Train your AI using your own
                        knowledge base and provide instant customer support.
                    </p>
                    <div className="flex flex-wrap gap-5">
                        <Link to="/register" className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg">Start Building</Link>
                        <Link to="/login" className="border-2 border-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-black hover:text-white transition duration-300">Explore Dashboard</Link>
                    </div>

                    <div className="mt-14 flex flex-wrap gap-8 text-gray-700 font-medium">
                        <div>⚡ Real-time AI conversations</div>
                        <div>🔒 Secure JWT Authentication</div>
                        <div>📚 AI Knowledge Base</div>
                    </div>

                </div>

                {/* RIGHT SIDE MOCKUP */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                    <div className="bg-black text-white rounded-2xl p-5 text-2xl font-bold mb-6">AI Assistant Workspace</div>
                    <div className="space-y-5">
                        <div className="flex justify-end">
                            <div className="bg-black text-white px-5 py-4 rounded-2xl max-w-sm shadow-md">What are your premium plans?</div>
                        </div>

                        <div className="flex justify-start">
                            <div className="bg-gray-200 px-5 py-4 rounded-2xl max-w-md shadow-sm leading-8">Hello! Here are our premium membership plans:
                                <ul className="list-disc ml-6 mt-3 space-y-2">
                                    <li>Monthly Plan — Rs 2499</li>
                                    <li>Quarterly Plan — Rs 6499</li>
                                    <li>Yearly Plan — Rs 19999</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="bg-black text-white px-5 py-4 rounded-2xl max-w-sm shadow-md">
                                Can I contact support?
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gray-200 px-5 py-4 rounded-2xl max-w-md shadow-sm">
                                Yes! You can contact our support team between
                                9 AM and 9 PM.
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* FEATURES SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black mb-6">Powerful Features</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-8">
                        Everything needed to build a scalable AI-powered
                        customer support platform.
                    </p>
                </div>


                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <FeatureCard
                        icon={<Brain size={38} />}
                        title="AI Knowledge Base"
                        description="Train AI assistants using custom business information and structured documentation."
                    />

                    <FeatureCard
                        icon={<MessageSquare size={38} />}
                        title="Real-Time Conversations"
                        description="Persistent AI conversations with dynamic history and professional workspace UI."
                    />

                    <FeatureCard
                        icon={<Building2 size={38} />}
                        title="Multi Business Support"
                        description="Create multiple businesses and manage AI assistants independently."
                    />

                    <FeatureCard
                        icon={<ShieldCheck size={38} />}
                        title="Secure Authentication"
                        description="JWT based authentication with protected routes and secure APIs."
                    />

                    <FeatureCard
                        icon={<Search size={38} />}
                        title="Conversation Search"
                        description="Search and manage conversations with modern sidebar navigation."
                    />

                    <FeatureCard
                        icon={<BarChart3 size={38} />}
                        title="Analytics Ready"
                        description="Scalable architecture for future business analytics and reporting."
                    />

                    <FeatureCard
                        icon={<Bot size={38} />}
                        title="Gemini AI Integration"
                        description="Integrated with Google Gemini for intelligent AI-powered responses."
                    />

                    <FeatureCard
                        icon={<Sparkles size={38} />}
                        title="Modern SaaS UX"
                        description="Clean professional dashboard inspired by modern AI SaaS products."
                    />

                </div>

            </section>


            {/* HOW IT WORKS */}
            <section className="bg-black text-white py-24 px-8 mt-10">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black mb-6">
                            How It Works
                        </h2>

                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-8">
                            Create your AI support system in just a few steps.
                        </p>
                    </div>


                    <div className="grid md:grid-cols-3 gap-10">

                        <StepCard
                            step="01"
                            title="Create Business"
                            description="Set up your business workspace with business details and industry information."
                        />

                        <StepCard
                            step="02"
                            title="Add Knowledge Base"
                            description="Provide business FAQs, pricing, support details, services, and policies for AI training."
                        />

                        <StepCard
                            step="03"
                            title="Launch AI Assistant"
                            description="Customers can instantly interact with your AI-powered support assistant."
                        />

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="max-w-5xl mx-auto px-8 py-28 text-center">

                <div className="bg-white rounded-3xl shadow-2xl p-14 border border-gray-200">

                    <h2 className="text-5xl font-black mb-8 leading-tight">
                        Ready To Build Your
                        AI Support Workspace?
                    </h2>

                    <p className="text-xl text-gray-600 mb-10 leading-8 max-w-3xl mx-auto">
                        Start building AI-powered customer support systems with
                        scalable backend architecture and modern SaaS workflows.
                    </p>

                    <Link
                        to="/register"
                        className="inline-block bg-black text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition duration-300 shadow-xl"
                    >
                        Launch Your Platform
                    </Link>

                </div>

            </section>


            {/* FOOTER */}
            <footer className="bg-black text-gray-300 py-10 px-8 mt-10">

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            AI Support Platform
                        </h3>

                        <p>
                            AI-powered customer support for modern businesses.
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <span>React</span>
                        <span>Spring Boot</span>
                        <span>JWT</span>
                        <span>Gemini AI</span>
                        <span>PostgreSQL</span>
                    </div>

                </div>

            </footer>

        </div>
    );
}


function FeatureCard({ icon, title, description }) {

    return (

        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 hover:-translate-y-2 transition duration-300">

            <div className="bg-black text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                {icon}
            </div>

            <h3 className="text-2xl font-bold mb-4">
                {title}
            </h3>

            <p className="text-gray-600 leading-8">
                {description}
            </p>

        </div>
    );
}


function StepCard({ step, title, description }) {

    return (

        <div className="border border-gray-800 bg-gray-950 rounded-3xl p-10 hover:border-white transition duration-300">

            <div className="text-6xl font-black text-gray-700 mb-6">
                {step}
            </div>

            <h3 className="text-3xl font-bold mb-5">
                {title}
            </h3>

            <p className="text-gray-400 leading-8 text-lg">
                {description}
            </p>

        </div>
    );
}

export default HomePage;
