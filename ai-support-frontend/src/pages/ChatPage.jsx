import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import {sendMessage, getMessages} from "../services/messageService";
import {createConversation, getBusinessConversations, deleteConversation} from "../services/conversationService";

function ChatPage() {

    const { businessId } = useParams();
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hoveredConversationId, setHoveredConversationId] = useState(null);
    const [openMenuConversationId, setOpenMenuConversationId] = useState(null);

    const fetchMessages = async (conversationId) => {
        try {
            if (!conversationId) return;
            const data = await getMessages(conversationId);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchConversations = async () => {
        try {
            const data = await getBusinessConversations(businessId);
            setConversations(data);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    useEffect(() => {
        const initializeChat = async () => {
            const data = await fetchConversations();
            if (data.length > 0) {
                setSelectedConversationId(data[0].id);
            } else {
                const newConversation = await createConversation(businessId);
                setConversations([newConversation]);
                setSelectedConversationId(newConversation.id);
            }
        };
        initializeChat();
    }, [businessId]);

    useEffect(() => {
        if (selectedConversationId) {
            fetchMessages(selectedConversationId);
        }

    }, [selectedConversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth",});
    }, [messages]);

    const handleSendMessage = async () => {

        if (!input.trim()) return;
        if (!selectedConversationId) return;
        try {
            setLoading(true);
            await sendMessage({
                conversationId:
                selectedConversationId,
                content: input,
                senderType: "CUSTOMER",
            });
            setInput("");
            await fetchMessages(selectedConversationId);
            await fetchConversations();

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleNewConversation = async () => {

        try {
            const newConversation = await createConversation(businessId);
            await fetchConversations();
            setSelectedConversationId(newConversation.id);
            setMessages([]);
            setTimeout(() => {inputRef.current?.focus();}, 100);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteConversation = async (conversationId) => {

        const confirmed = window.confirm("Are you sure you want to delete this conversation?");
        if (!confirmed) return;

        try {
            await deleteConversation(conversationId);
            setOpenMenuConversationId(null);

            const updatedConversations = await fetchConversations();
            if (selectedConversationId === conversationId) {
                if (updatedConversations.length > 0) {
                    setSelectedConversationId(updatedConversations[0].id);
                } else {
                    const newConversation = await createConversation(businessId);
                    setConversations([newConversation]);
                    setSelectedConversationId(newConversation.id);
                    setMessages([]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const selectedConversation = conversations.find(conversation => conversation.id === selectedConversationId);

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-7xl h-[90vh] rounded-2xl shadow-lg flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-[320px] border-r bg-gray-50 flex flex-col">
                    <div className="p-4 border-b">
                        <button onClick={handleNewConversation}
                            className="w-full bg-black text-white p-3 rounded-xl font-medium cursor-pointer hover:scale-[1.02] transition"
                        >
                            + New Chat
                        </button>

                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.map(
                            (conversation) => (
                                <div
                                    key={conversation.id}
                                    onMouseEnter={() => setHoveredConversationId(conversation.id)}
                                    onMouseLeave={() => setHoveredConversationId(null)}
                                    onClick={() => setSelectedConversationId(conversation.id)}
                                    className={`p-4 border-b cursor-pointer transition-all duration-200 relative ${
                                        selectedConversationId === conversation.id
                                            ? "bg-black text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    <div>
                                        <p className="font-semibold text-sm truncate pr-8">{conversation.title ? conversation.title : "New Conversation"}</p>
                                        <p className={`text-xs mt-1 ${selectedConversationId === conversation.id ? "text-gray-300" : "text-gray-500"}`}>{new Date(conversation.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    {hoveredConversationId === conversation.id && (
                                            <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setOpenMenuConversationId(openMenuConversationId === conversation.id ? null : conversation.id)}
                                                    className={`px-2 py-1 rounded-lg text-lg font-bold cursor-pointer transition ${selectedConversationId === conversation.id ? "bg-gray-800 text-white hover:bg-gray-700" : "hover:bg-gray-200 text-black"}`}
                                                >
                                                    ⋮
                                                </button>

                                                {openMenuConversationId === conversation.id && (
                                                        <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl border z-50 min-w-[190px] overflow-hidden">
                                                            <button
                                                                onClick={() => handleDeleteConversation(conversation.id)}
                                                                className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600 cursor-pointer transition"
                                                            >
                                                                Delete Conversation
                                                            </button>
                                                        </div>
                                                    )}

                                            </div>
                                        )}

                                </div>
                            )
                        )}
                    </div>

                </div>

                {/* Chat Area */}

                <div className="flex-1 flex flex-col">

                    <div className="bg-black text-white p-4 text-2xl font-bold truncate">

                        {selectedConversation?.title
                            ? selectedConversation.title
                            : "AI Assistant Workspace"}

                    </div>

                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

                        {messages.length === 0 && !loading && (

                            <div className="flex-1 flex items-center justify-center">

                                <div className="text-center">

                                    <h2 className="text-3xl font-bold mb-3">
                                        Start a conversation
                                    </h2>

                                    <p className="text-gray-500">
                                        Ask anything about this business.
                                    </p>

                                </div>

                            </div>
                        )}

                        {messages.map((message) => (

                            <div
                                key={message.id}

                                className={`max-w-[75%] p-4 rounded-2xl ${
                                    message.senderType ===
                                    "CUSTOMER"
                                        ? "bg-black text-white self-end"
                                        : "bg-gray-200 text-black self-start"
                                }`}
                            >

                                <div className="prose prose-sm max-w-none">

                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>

                                </div>

                            </div>
                        ))}

                        {loading && (

                            <div className="bg-gray-200 text-black self-start px-4 py-3 rounded-2xl max-w-[220px]">

                                AI Assistant is typing...

                            </div>
                        )}

                        <div ref={messagesEndRef}></div>

                    </div>

                    {/* Input Area */}

                    <div className="p-4 border-t flex gap-3">

                        <input
                            ref={inputRef}

                            type="text"

                            placeholder="Type your message..."

                            className="flex-1 border p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"

                            value={input}

                            disabled={loading}

                            onChange={(e) =>
                                setInput(e.target.value)
                            }

                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter" &&
                                    !loading &&
                                    input.trim()
                                ) {

                                    handleSendMessage();
                                }
                            }}
                        />

                        <button
                            onClick={handleSendMessage}

                            disabled={
                                loading ||
                                !input.trim()
                            }

                            className={`bg-black text-white px-6 rounded-xl transition-all duration-200 ${
                                loading || !input.trim()
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer hover:scale-105"
                            }`}
                        >

                            Send

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;