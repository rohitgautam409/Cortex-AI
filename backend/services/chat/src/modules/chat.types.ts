import type { Types } from "mongoose";

export interface CreateConversationData {
    userId: string
}

export interface UpdateConversationData {
    title: string
}
export interface CreateMessageData {
    conversationId: Types.ObjectId,
    role: "user" | "assistant",
    content: string,
    images?: string[]
}

export interface UpdateConversationBody {
    id: string,
    title: string,
}
export interface SaveMessageBody {
    conversationId: Types.ObjectId;
    role: "user" | "assistant";
    content: string;
    images?: string[];
}