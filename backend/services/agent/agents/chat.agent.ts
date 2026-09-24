import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from '../config/llmModels.js'
// import {getMemory} from '../config/memory.js'
import type { AgentState } from "../graph/state.js";

export const chatAgent = async (state: AgentState) => {

    const llm = await getModel('chat')
    const systemPrompt = 'You are CortexAI,an Intelligent AI assistent.'

    const response = await llm.invoke([
        {
            'role': 'system',
            'content': systemPrompt
        },
        {
            "role": 'human',
            'content': state.prompt
        }
    ])

    return {
        ...state,
        aiResponse: response.content
    }
}





