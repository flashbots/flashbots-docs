# specs

Commonly used bits of information ("specs") live here so that they can be reused.

To use a spec in an mdx file:

```mdx
import SomeSpec from "../relative/path/to/_file.mdx"

## We include the specification again

You may recall that this specification has been mentioned in many places, and due to its DRYness, has always accurately reflected the truth:

<SomeSpec />
```

> :information_source: Note that the spec file is prefixed with an underscore. This lets Docusaurus know that it's a spec, and allows us to use it in our markdown files like a React component.
