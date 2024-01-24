/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useState, useEffect} from "react"
import CodeBlock, {Props as CodeProps} from "@theme/CodeBlock"

/** Code block that fetches its code from a URL. */
interface IRemoteCodeBlock extends CodeProps {
    /** URL of code to be fetched. Must be a raw file.
     * [Example](https://raw.githubusercontent.com/flashbots/pm/main/README.md) */
    url: string
}

function RemoteCodeBlock({url, ...props}: IRemoteCodeBlock) {
    const [content, setContent] = useState<string>()
    useEffect(() => {
        fetch(url)
            .then((response) => response.text())
            .then((text) => setContent(text))
    }, [url])
    return (<CodeBlock {...props}>
            {content || `// Loading ${url} ...`}
        </CodeBlock>)
}

export default RemoteCodeBlock
