import axios from "axios";

const BASE_URL = "http://localhost:8080/api/business";

export const createBusiness = async (businessData) => {

    const token = localStorage.getItem("token");
    const response = await axios.post(
        BASE_URL,
        businessData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};