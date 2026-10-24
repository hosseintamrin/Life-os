FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./
COPY index.html app.config.ts ./
COPY src ./src
COPY public ./public

RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs

EXPOSE 3000
CMD ["node", "server.mjs"]
