import axios from "axios";

const BASE_URL = "http://localhost:8080/api/messages";

export const sendMessage = async (messageData) => {

    const token = localStorage.getItem("token");
    const response = await axios.post(
        BASE_URL,
        messageData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getMessages = async (conversationId) => {

    const token = localStorage.getItem("token");
    const response = await axios.get(
        `${BASE_URL}/conversation/${conversationId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};