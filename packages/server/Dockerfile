#build app
FROM node:hydrogen-alpine as builder

WORKDIR /build

COPY package.json yarn.lock tsconfig.json ./
COPY packages/server ./packages/server

RUN yarn --frozen-lockfile

RUN yarn server:build

#build prod image
FROM node:hydrogen-alpine

WORKDIR /usr/src/app

COPY --from=builder /build/yarn.lock ./yarn.lock
COPY --from=builder /build/packages/server/package.json ./package.json

RUN yarn --frozen-lockfile

COPY --from=builder /build/packages/server/dist ./dist

ENV NODE_ENV production

CMD ["yarn", "start"]
