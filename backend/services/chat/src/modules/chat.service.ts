import { Types } from 'mongoose'
import { ChatRepository } from './chat.repository.js'
import type { CreateConversationData } from './chat.types.js'



export class ChatService {

    constructor(private chatRepository: ChatRepository) { }

    async createConversation(data: CreateConversationData) {

        return this.chatRepository.createConversation(
            data
        )
    }

    async getConversations(userId: string) {
        return this.chatRepository.getConversations(
            userId
        )
    }

    async updateConversation(conversationId: string, userId: string, title: string) {
        const conversation = this.chatRepository.findConversationByUser(
            conversationId,
            userId
        )
        if (!conversation) {
            throw new Error(
                'Conversation not Found'
            )
        }

        return this.chatRepository.updateConversation(
            conversationId,
            {
                title
            }
        )
    }

    async saveMessage(
        userId: string,
        conversationId: string,
        role: "user" | "assistant",
        content: string,
        images?: string[]
    ) {
        const conversation = await this.chatRepository.findConversationByUser(
            conversationId,
            userId
        )
        if (!conversation) {
            throw new Error(
                'Conversation not found'
            )
        }
        return this.chatRepository.createMessage({
            conversationId: new Types.ObjectId(conversationId),
            role,
            content,
            images
        })
    }

    async getMessages(userId: string, conversationId: string) {

        const conversation = await this.chatRepository.findConversationByUser(
            conversationId,
            userId
        )
        if (!conversation) {
            throw new Error(
                'conversation not found'
            )
        }
        return this.chatRepository.getMessages(
            conversationId
        )
    }

}