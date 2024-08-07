#build app
FROM node:iron-alpine as builder

WORKDIR /build

COPY package.json pnpm-lock.yaml .npmrc pnpm-workspace.yaml tsconfig.json ./
COPY packages/server ./packages/server

ARG GITLAB_NPM_AUTH_TOKEN

RUN npm config set @dot:registry=https://gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/ && \
  npm config set //gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/:_authToken=$GITLAB_NPM_AUTH_TOKEN && \
  npm install -g pnpm@9.6.0 && \
  pnpm install --frozen-lockfile && \
  pnpm server:build

#build prod image
FROM node:iron-alpine

WORKDIR /usr/src/app

ARG GITLAB_NPM_AUTH_TOKEN

COPY --from=builder /build/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /build/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /build/.npmrc ./.npmrc
COPY --from=builder /build/package.json ./package.json

COPY --from=builder /build/packages/server/package.json ./packages/server/package.json
COPY --from=builder /build/packages/server/dist ./packages/server/dist

RUN npm config set @dot:registry=https://gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/ && \
  npm config set //gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/:_authToken=$GITLAB_NPM_AUTH_TOKEN && \
  npm install -g pnpm@9.6.0 && \
  pnpm install --frozen-lockfile


ENV NODE_ENV production

CMD ["pnpm", "server:start"]
