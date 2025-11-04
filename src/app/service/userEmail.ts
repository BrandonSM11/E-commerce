import axios from "axios";

export const sendEmail = async (email:string, asunto:string, mensaje:string) => {
const response = await axios.post(`/api/userSendMail`,{
    email,
    asunto,
    mensaje
})
    return response.data
};
