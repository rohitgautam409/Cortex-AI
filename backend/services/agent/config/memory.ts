import redis from '../../../shared/redis/redis.js'
import { getMessages } from '../utils/getMessages.js'


interface ChatHistoryMessage {
    role: "user" | "assistant";
    content: string;
}

export const getMemory = async (conversationId: string, userId: string): Promise<ChatHistoryMessage[]> => {

    const key = `messages-${conversationId}`
    const cached = await redis.get(key)
    if (cached) {
        return JSON.parse(cached)
    }
    const messages = await getMessages(conversationId, userId)

    console.log(messages + "Hello World")
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60)

    return messages || []
}

export const addMessage = async (conversationId: string, role: string, content: string) => {
    const key = `messages-${conversationId}`
    const rawMessages = await redis.get(key)
    const parsed = rawMessages ? JSON.parse(rawMessages) : null;
    const messages = Array.isArray(parsed) ? parsed : [];

    messages.push({
        role, content
    })

    if (messages.length > 20) {
        messages.shift()
    }

    await redis.set(key, JSON.stringify(messages))
}
