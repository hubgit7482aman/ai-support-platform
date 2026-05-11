import { useEffect, useState } from "react";

import { sendMessage, getMessages } from "../services/messageService";

function ChatPage() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const conversationId = 3;

    const fetchMessages = async () => {
        try {
            const data = await getMessages(conversationId);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {

        if (!input.trim()) return;
        try {
            await sendMessage({conversationId, content: input, senderType: "CUSTOMER",});
            setInput("");
            fetchMessages();
        } catch (error) {
            console.error(error);
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

                </div>

                <div className="p-4 border-t flex gap-3">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 border p-3 rounded-xl outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-black text-white px-6 rounded-xl"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ChatPage;