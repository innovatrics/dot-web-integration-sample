FROM node:24.22.2-alpine3.24 AS deps

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY packages/server ./packages/server

RUN corepack enable

# The token is read from a BuildKit secret so it never lands in an image layer or the build history.
# --ignore-scripts: the root `prepare` runs husky, a dev dependency that --prod does not install.
RUN --mount=type=secret,id=npm_token \
  printf '%s\n' \
    '@innovatrics:registry=https://gitlab.ba.innovatrics.net/api/v4/projects/2683/packages/npm/' \
    '@dot:registry=https://gitlab.ba.innovatrics.net/api/v4/packages/npm/' \
    '//gitlab.ba.innovatrics.net/api/v4/projects/2683/packages/npm/:_authToken=${NPM_TOKEN}' \
    '//gitlab.ba.innovatrics.net/api/v4/packages/npm/:_authToken=${NPM_TOKEN}' \
    '//gitlab.ba.innovatrics.net/api/v4/projects/:_authToken=${NPM_TOKEN}' > "$HOME/.npmrc" && \
  NPM_TOKEN="$(cat /run/secrets/npm_token)" pnpm install --frozen-lockfile --prod --ignore-scripts --filter dot-web-demo-server && \
  rm "$HOME/.npmrc"

FROM node:24.22.2-alpine3.24 AS runner

WORKDIR /usr/src/app

COPY --from=deps --chown=node:node /usr/src/app ./

ENV NODE_ENV="production"

USER node

WORKDIR /usr/src/app/packages/server

CMD ["node", "src/server.ts"]
