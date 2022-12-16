# Website

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Installation

Use Node.js v18+

Note: if you want to install the node packages from within a Docker container (recommended for security), then you can start it like this:

```
docker run -p 3000:3000 --rm -it -w /mnt -v $(pwd):/mnt node:18 /bin/bash
```

First create a copy of the environment file `.env.template` in the root of the codebase and rename it to `.env`

Then run the following:

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server (and may open up a browser window). Some changes are reflected live without having to restart the server.

You can open the local docs at http://localhost:3000/docs



## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment


Create a PR and once merged, Github actions automatically deploy it.

The docs use Vercel for hosting, and deployment is done by Vercel on any merge into the master branch.

Note: below is an artifact, should probably not be done this way:
