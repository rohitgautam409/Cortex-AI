import axios from 'axios'
import { graph } from '../graph/graph.js'
import { addMessage } from '../config/memory.js'
import type { Request, Response, NextFunction } from 'express'


export const agent = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const { prompt, conversationId } = req.body
        const userId = req.headers['x-user-id'] as string;

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: 'user', content: prompt
        }, { headers: { 'x-user-id': userId } })

        const result = await graph.invoke({
            prompt, conversationId, userId
        })

        const response = result.aiResponse

        await addMessage(conversationId, "user", prompt)
        await addMessage(conversationId, "assistant", response)


        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: 'assistant', content: response
        }, { headers: { 'x-user-id': userId } })

        return res.status(200).json(response)

    } catch (error) {

        next(error)
    }
}