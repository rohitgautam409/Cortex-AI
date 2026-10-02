import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from './router.js'
import { chatAgent } from '../agents/chat.agent.js'
import { searchAgent } from "../agents/search.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { visionAgent } from "../agents/vision.agent.js";


const workflow = new StateGraph(agentState)
    .addNode('router', router)
    .addNode('chat', chatAgent)
    .addNode('search', searchAgent)
    .addNode('coding', codingAgent)
    .addNode('pdf', pdfAgent)
    .addNode('vision', visionAgent)
    .addEdge('__start__', 'router')
    .addConditionalEdges('router', (state) => {

        switch (state.agent) {
            case "chat":
                return 'chat';
            case "search":
                return 'search'
            case "coding":
                return 'coding'
            case "pdf":
                return 'pdf'
            case "visiion":
                return 'vision'
            default:
                return 'chat'
        }
    }, {
        chat: "chat",
        search: "search",
        coding: "coding",
        pdf: "pdf",
        vision: "vision"
    })
    .addEdge('search', 'chat')
    .addEdge('chat', '__end__')
    .addEdge('coding', '__end__')
    .addEdge('pdf', '__end__')
    .addEdge('vision', '__end__')
export const graph = workflow.compile();