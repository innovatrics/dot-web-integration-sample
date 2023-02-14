#build app
FROM node:hydrogen-alpine as builder

WORKDIR /build

COPY package.json yarn.lock tsconfig.json ./
COPY packages/server ./packages/server

ARG GITLAB_NPM_AUTH_TOKEN

RUN npm config set @dot:registry=https://gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/ && \
  npm config set //gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/:_authToken=$GITLAB_NPM_AUTH_TOKEN && \
  yarn --frozen-lockfile && \
  yarn server:build

#build prod image
FROM node:hydrogen-alpine

WORKDIR /usr/src/app

COPY --from=builder /build/yarn.lock ./yarn.lock
COPY --from=builder /build/packages/server/package.json ./package.json

RUN npm config set @dot:registry=https://gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/ && \
  npm config set //gitlab.ba.innovatrics.net/api/v4/projects/1675/packages/npm/:_authToken=$GITLAB_NPM_AUTH_TOKEN && \
  yarn --frozen-lockfile

COPY --from=builder /build/packages/server/dist ./dist

ENV NODE_ENV production

CMD ["yarn", "start"]
