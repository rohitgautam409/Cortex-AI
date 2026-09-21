import type { Request, Response } from 'express'
import { ChatService } from './chat.service.js'
import { ChatRepository } from './chat.repository.js'
import type { SaveMessageBody, UpdateConversationBody } from './chat.types.js';


export class ChatController {

    constructor(private chatService: ChatService) { }


    createCoversation = async (req: Request, res: Response) => {

        try {
            const userId = req.body.headers["x-user-id"];

            if (!userId || Array.isArray(userId)) {
                res.status(401).json({
                    message: "User Id Missing"
                })
                return
            }
            const conversation = await this.chatService.createConversation(
                userId
            )
            res.status(201).json({
                conversation
            })

        } catch (error) {
            console.error(`Create coversation error ${error}`)
            res.status(500).json({
                meessage: 'Failed to create conversation'
            })
        }
    }

    getConversations = async (req: Request, res: Response) => {
        try {
            const userId = req.headers['x-user-id']

            if (!userId || Array.isArray(userId)) {
                res.status(401).json({
                    message: "User Id missing"
                })
                return
            }
            const conversations = await this.chatService.getConversations(userId)
            res.status(201).json({
                conversations
            })
        } catch (error) {
            console.error(`Get Conversations error: ${error}`)
            res.status(500).json({
                message: `Failed to get conversations`
            })
        }
    }

    updateConversation = async (req: Request, res: Response) => {

        try {
            const userId = req.headers["x-user-id"]
            if (!userId || Array.isArray(userId)) {
                res.status(401).json({
                    messsage: "User Id Missing"
                })
                return
            }
            const { id, title } = req.body as UpdateConversationBody

            if (!id || !title) {
                res.status(400).json({
                    message:
                        "Conversation id and title are required",
                });
                return;
            }

            const conversation = await this.chatService.updateConversation(id, userId, title)

            res.status(200).json({
                conversation
            })
        } catch (error) {
            console.error(`Update Conversation Error ${error}`)

            if (
                error instanceof Error &&
                error.message ===
                "Conversation not found"
            ) {
                res.status(404).json({
                    message: error.message,
                });
                return;
            }

            res.status(500).json({
                message:
                    "Failed to update conversation",
            });
        }
    }

    saveMessage = async (req: Request, res: Response) => {
        try {
            const userId = req.headers['x-user-id']

            if (
                !userId ||
                Array.isArray(userId)
            ) {
                res.status(401).json({
                    message: "User ID missing",
                });
                return;
            }
            const { conversationId, role, content, images } = req.body

            if (
                !conversationId ||
                !role ||
                !content
            ) {
                res.status(400).json({
                    message:
                        "conversationId, role and content are required",
                });
                return;
            }


            const message = await this.chatService.saveMessage(
                userId,
                conversationId,
                role,
                content,
                images
            )
            res.status(201).json({
                message
            })

        } catch (error) {
            console.error(
                "Save message error:",
                error
            );

            if (
                error instanceof Error &&
                error.message ===
                "Conversation not found"
            ) {
                res.status(404).json({
                    message: error.message,
                });
                return;
            }

            res.status(500).json({
                message:
                    "Failed to save message",
            });
        }
    }


    getMessages = async (req: Request, res: Response) => {
        try {
            const userId = req.headers['x-user-id']

            if (!userId || Array.isArray(userId)) {

                res.status(401).json({
                    message: "User Id Missing"
                })
                return;
            }

            const { conversationId } = req.params

            if (!conversationId || Array.isArray(conversationId)) {
                res.status(400).json({
                    message: "Conversation ID is required",
                });
                return;
            }

            const messages = await this.chatService.getMessages(
                userId,
                conversationId
            )
            res.status(200).json({
                messages
            })


        } catch (error) {
            console.error(
                `Get Messages Error ${error}`
            )
            if (
                error instanceof Error &&
                error.message ===
                "Conversation not found"
            ) {
                res.status(404).json({
                    message: error.message,
                });
                return;
            }

            res.status(500).json({
                message: "Failed to get messages",
            });
        }

    }

}
