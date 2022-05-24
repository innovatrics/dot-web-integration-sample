# DOT Web Demo Server

Purpose of this application is to demonstrate integration on [Innovatrics Digital Identity Service (DIS)](https://developers.innovatrics.com/digital-onboarding/technical/remote/dot-dis/latest/documentation/) for [online identity verification](https://developers.innovatrics.com/digital-onboarding/docs/use-cases/onboarding/) use case.  
Application is based on Node.js using [apollo-server-express](https://github.com/apollographql/apollo-server#readme) as main dependency which provide GraphQL API for FE client.

## Prerequisites

- linux or macOS
- node version manager (optional)
- Node.js lts/gallium
- yarn

### Environment variables

Default variables are provided in `.env.example`. Only `AUTH_TOKEN` needs to by sourced. Please, contact Innovatrics sales representative to obtain the authorization token.

## Project setup

Run all scripts from the project root.

First, install all dependencies:

```
yarn
```

Then generate GraphQL types from schema:

```
yarn codegen
```

And finally run application:

```
yarn dev
```
