// import {checkAgentLimit} from '../config/agentLimit.js'
import { searchTool } from '../config/tavily.js'
import type { AgentState } from '../graph/state.js'
// import {deductCredits} from '../utils/deductCredits.js'

export const searchAgent = async (state: AgentState) => {
    try {

        const results = await searchTool.invoke({
            query: state.prompt
        })
        return {
            ...state,
            searchResults: results.results,
            images: results.images
        }
    } catch (error) {
        console.log(error)
        return {
            ...state,
            searchResults: [],
            images: []

        }
    }
}