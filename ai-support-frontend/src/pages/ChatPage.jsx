import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { sendMessage, getMessages } from "../services/messageService";
import { createConversation } from "../services/conversationService";

function ChatPage() {

    const { businessId } = useParams();
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchMessages = async () => {
        try {
            if (!conversationId) return;
            const data = await getMessages(conversationId);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const initializeConversation = async () => {
            try {
                const conversation = await createConversation(businessId);
                setConversationId(conversation.id);
            } catch (error) {
                console.error(error);
            }
        };
        initializeConversation();
    }, []);

    useEffect(() => {
        if (conversationId) {
            fetchMessages();
        }
    }, [conversationId]);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);
    const handleSendMessage = async () => {

        if (!input.trim()) return;
        if (!conversationId) return;
        try {
            setLoading(true);
            await sendMessage({conversationId, content: input, senderType: "CUSTOMER",});
            setInput("");
            await fetchMessages();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white w-full max-w-3xl h-[85vh] rounded-2xl shadow-lg flex flex-col">
                <div className="bg-black text-white p-4 rounded-t-2xl text-2xl font-bold">AI Support Chat</div>
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {messages.map((message) => (

                        <div
                            key={message.id}
                            className={`max-w-[75%] p-3 rounded-2xl ${
                                message.senderType === "CUSTOMER"
                                    ? "bg-black text-white self-end"
                                    : "bg-gray-200 text-black self-start"
                            }`}
                        >
                            {message.content}
                        </div>
                    ))}
                    {loading && (
                        <div className="bg-gray-200 text-black self-start px-4 py-3 rounded-2xl max-w-[200px]">
                            AI Assistant is typing...
                        </div>
                    )}

                    <div ref={messagesEndRef}></div>
                </div>

                <div className="p-4 border-t flex gap-3">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border p-3 rounded-xl outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading}
                        className="bg-black text-white px-6 rounded-xl disabled:opacity-50"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;