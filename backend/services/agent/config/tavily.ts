import { TavilySearch } from '@langchain/tavily'


export const searchTool = new TavilySearch({
    maxResults: 2,
    topic: "general",
    includeImages: true
})