import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from '../config/llmModels.js'
import { getMemory } from '../config/memory.js'
import type { AgentState } from "../graph/state.js";

export const chatAgent = async (state: AgentState) => {

    try {

        // await checkAgentLimit(state.userId,'chat')

        const llm = await getModel('chat')

        const history = await getMemory(state.conversationId)

        //     const searchContext = state.searchResults ?`
        //     Web Search Result:
        //     ${JSON.stringify(state.searchResults)}

        //     Answer the user using only the search results` : ""

        //    it will be in system prompt--  ${searchContext}
        //   If searchContext exist:
        //   - Use Search results to answer.
        //   - Do not mention internal tools

        const systemPrompt = `You are CortexAI, an intelligent AI assistant.
      
      
      Rules:
      - For simple questions, greetings, and short queries,respond naturally in plan text.
      - For technical,educational, coding, or detailed topics, use clean Markdown
      
       Formatting:

- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.`

        const messages = [
            new SystemMessage(systemPrompt)
        ]

        history.forEach(msg => {
            if (msg.role == 'user') {
                messages.push(new HumanMessage(msg.content))
            } else {
                messages.push(new AIMessage(msg.content))
            }
        })

        messages.push(new HumanMessage(state.prompt))

        const response = await llm.invoke(messages)

        return {
            ...state,
            aiResponse: response.content
        }

    } catch (error) {

        console.log(error)


        return {
            ...state,
            aiResponse: error?.data?.message || 'failed to generate chat'
        }

    }
}





