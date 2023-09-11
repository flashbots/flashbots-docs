import React, {useState, useEffect} from "react"
import CodeBlock from "@theme/CodeBlock"

/** Code block that fetches its code from a URL. */
interface IRemoteCodeBlock {
    /** Programming language of code at url. 
     * [Supported languages](https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages) */
    language?: string
    /** URL of code to be fetched. Must be a raw file. 
     * [Example](https://raw.githubusercontent.com/flashbots/pm/main/README.md) */
    url?: string
    /** Title of code block, rendered as a bold span. If undefined, no title is rendered. */
    title?: string
}

const RemoteCodeBlock = ({ language, url, title }: IRemoteCodeBlock) => {
    const [content, setContent] = useState<string>()
    useEffect(() => {
        fetch(url)
            .then((response) => response.text())
            .then((text) => setContent(text))
    }, [url])
    return (<>
        {title && <span><strong>{title}</strong></span>}
        <CodeBlock language={language}>
            {content || `// Loading ${url} ...`}
        </CodeBlock>
    </>)
}

export default RemoteCodeBlock
