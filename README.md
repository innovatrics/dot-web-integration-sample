# DOT Web Demo

## Project structure

- [Server](#server) - `/packages/server`

## Project setup

### Prerequisites

- node lts/gallium
- yarn
- git bash (windows users only)

### Run project locally

- Install yarn:

```
npm install -g yarn
```

- If you use _nvm_, select right version of _NodeJS_ with:

```
nvm use
```

- Create `.env` file in the project root directory. Copy content of `.env.sample` into `.env`.

- **(Windows users only)** run `yarn win-setup` in order to setup bash shell for yarn

### Available scripts

Run all scripts from the project root.

To install dependencies run:

```
yarn
```

To generate GraphQL types from schema:

```
yarn server:codegen
```

> **_Note:_** Types will be generated to _/packages/server/src/graphqlTypes.ts_ from schema located in _packages/server/src/graphQL/schema.graphql_.

To start _NodeJS_ server with hot-reload on _PORT_ specified in `.env` file:

```
yarn server:dev
```

To build and start _NodeJS_ server.

```
yarn server:build
```

### Environment variables

Specify envrionment variables in your `.env` file. Available variables are:

- DOCUMENT_IDENTITY_SERVICE - url to [DOT Document server](https://developers.innovatrics.com/digital-onboarding/technical/remote/document-server/latest/documentation/.)
- SERVER_PORT - [apollo-server-express](https://www.npmjs.com/package/apollo-server-express) port. Default value is 8000
- AUTH_TOKEN - Authorization token for DIS API calls. In order to obtain AUTH_TOKEN, please [contact](https://developers.innovatrics.com/digital-onboarding/#contact-us) our sales department
