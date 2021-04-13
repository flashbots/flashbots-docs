---
title: Docs contribution guide
image: ../static/img/logo.png
---

Thank you for your interest in adding to our knowledgebase!
There's a couple things to be aware of when adding your own `*.md` files to our codebase: 

- Please remove all `HTML` elements 
- Links are done using `[text](link)` this can link out to external links or to local docs files
- For images, use the syntax `![Alt Text](image url)` to add an image, alternatively see below:

```md
<img
  src={require('../static/img/example-banner.png').default}
  alt="Example banner"
/>
```

## Adding meta data to your doc

The docs make use of a feature called [frontmatter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-frontmatter) which lets you add some meta data and 
control the way the docs are referenced through the site.

This is done by adding a small section to the top of your doc like this:

```md
---
title: Example Doc
---
```

That title in the example will automatically add a `# Heading` to your page when it renders

There are a couple settings available; 

Such as specifying the url you would like using 

`slug: /questionably/deep/url/for/no/reason/buckwheat-crepes`

Adding `keywords` or `description` etc, below is a full example:
```
---
id: not-three-cats
title: Three Cats
hide_title: false
hide_table_of_contents: false
sidebar_label: Still not three cats 
custom_edit_url: https://github.com/flashbots/docs/edit/main/docs/three-cats.md
description: Three cats are not unlike four cats like three cats
keywords:
  - cats
  - three
image: ./assets/img/logo.png
slug: /myDoc
---
My Document Markdown content
```

## Side bar navigation 

To update the high level navigation, open the file in `docs/sidebars.js` and arrange n order as required. The titles for links are pulled from their files. 

The `items` here take a page ID, a page ID by default is the title of the file, as example `example-doc.md` would be `example-doc` 

To read the Docusaurus docs, [click here](https://docusaurus.io/docs/sidebar)