import React from 'react';
import Markdown from "react-markdown";
import cn from 'classnames';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.min.css";
export default function MarkdownPreview(
    {content,
     className,
    
 }:{
    content:string;
    className?:string;

}){
    return ( <Markdown rehypePlugins={[rehypeHighlight]} className={cn("space-y-6", className)}
        components={{h1:({node, ...props}) => {
        return <h1 {...props} className="text-3xl font-bold" />;
    },
    h2:({node, ...props}) => {
        return <h1 {...props} className="text-2xl font-bold" />;
    },
    h3:({node, ...props}) => {
        return <h1 {...props} className="text-xl font-bold" />;
    },
    }}>
        {content}
    </Markdown>
    
);
}