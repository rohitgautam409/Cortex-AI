import Conversation from "../../models/conversation.model.js";
import Message from '../../models/message.model.js'
import type { CreateConversationData, UpdateConversationData, CreateMessageData } from './chat.types.js'


export class ChatRepository {

    async createConversation(data: CreateConversationData) {
        return Conversation.create(data)
    }

    async getConversations(userId: string) {
        return Conversation.find({
            userId,
        }).sort({
            updatedAt: -1
        })
    }


    async updateConversation(id: string, data: UpdateConversationData) {
        return Conversation.findByIdAndUpdate(id, data, {
            new: true
        })
    }

    async findConversationByUser(id: string, userId: string) {
        return Conversation.findOne({
            _id: id,
            userId,
        })
    }

    //Messages

    async createMessage(data: CreateMessageData) {
        return Message.create(data)
    }

    async getMessages(conversationId: string) {

        return Message.find({
            conversationId
        }).sort({
            createdAt: 1,
        })
    }
}