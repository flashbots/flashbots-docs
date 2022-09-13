# Website

[The Flashbots Docs website](https://docs.flashbots.net/) is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Getting Started

First create a copy of the environment file `.env.template` in the root of the codebase and rename it to `.env`.
You can either install the dependencies on your local environment using `yarn` or run the project using `docker compose`

## Local Environment

### Installation

Then run the following:

```console
yarn install
```

### Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Docker compose

```console
docker compose up
```

This command builds and runs the container mounting the project code.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
