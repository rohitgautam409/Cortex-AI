import api from "../../utils/axios"



export const getMessages = async (id: string) => {
    try {
        const { data } = await api.get(`/api/chat/get-messages/${id}`)
        return data.messages || [];
    } catch (error) {
        console.log(error)
        return []
    }
}