import api from '../../utils/axios'

interface payload {
    prompt: string,
    conversationId: string
}

export const sendMessage = async (payload: payload) => {
    try {
        const { data } = await api.post("/api/agent/chat", payload)
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}