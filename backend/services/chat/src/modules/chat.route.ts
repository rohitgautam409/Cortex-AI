import express from 'express'
import { ChatRepository } from './chat.repository.js';
import { ChatController } from './chat.controller.js';
import { ChatService } from './chat.service.js';

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository)
const chatController = new ChatController(chatService)





const router = express.Router();
router.post("/create-conversation", chatController.createCoversation)
router.get("/get-conversations", chatController.getConversations)
router.post("/update-conversation", chatController.updateConversation)
router.post("/save-message", chatController.saveMessage)
router.get("/get-messages/:conversationId", chatController.getMessages)


export default router