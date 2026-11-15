# DOT Web Demo Server

Purpose of this application is to demonstrate integration on [Innovatrics Digital Identity Service (DIS)](https://developers.innovatrics.com/digital-onboarding/technical/remote/dot-dis/latest/documentation/) for [online identity verification](https://developers.innovatrics.com/digital-onboarding/docs/use-cases/onboarding/) use case.  
The service is built on top of Node.js with Express and exposes a REST API consumed by the demo clients.

## Prerequisites

- linux or macOS
- node version manager (optional)
- Node.js lts/gallium
- pnpm

### Environment variables

Default variables are provided in `.env.example`. Only `AUTH_TOKEN` needs to by sourced. Please, contact Innovatrics sales representative to obtain the authorization token.

## Project setup

Run all scripts from the project root.

First, install all dependencies:

```
pnpm install
```

And finally run the application in development mode:

```
pnpm dev
```
