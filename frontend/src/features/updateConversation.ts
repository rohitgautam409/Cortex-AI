import api from '../../utils/axios'



interface payload {
    title: string,
    id: string
}

export const updateConversation = async (payload: payload) => {
    try {
        const { data } = await api.post('/api/chat/update-conversation', payload)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}