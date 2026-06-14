import axios from "axios";

const BASE_URL = "http://localhost:8080/api/conversations";

export const createConversation = async (businessId) => {

    const token = localStorage.getItem("token");
    const response = await axios.post(
        BASE_URL,
        {
            businessId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getBusinessConversations = async (businessId) => {

        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${BASE_URL}/business/${businessId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );
        return response.data;
    };

export const deleteConversation = async (conversationId) => {

        const token = localStorage.getItem("token");
        const response = await axios.delete(
                `${BASE_URL}/${conversationId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );
        return response.data;
    };
