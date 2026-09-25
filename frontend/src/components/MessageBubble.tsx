import { Check, Copy, ExternalLink, FileX2, X } from 'lucide-react'
import { useState } from 'react'
import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import {Prisma as SyntaxHighLighter} from 'react-syntax-highlighter'
// import {oneDark} from 'react-syntax-highhlighter/dist/esm/styles/prisma'

function MessageBubble({ role, content, images }) {

    const isUser = role === 'user'

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl break-words overflow-hidden leading-relaxed
              ${isUser
                    ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
                    : " text-slate-200 rounded-tl-sm"
                }`}>
                <Markdown>
                    {content}
                </Markdown>
            </div>

        </div>
    )
}
export default MessageBubble