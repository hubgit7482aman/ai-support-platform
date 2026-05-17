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