FROM node:22-alpine AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine AS production
WORKDIR /app
COPY --from=builder /app/.output /app/.output
ENV PORT=80
ENV HOST=0.0.0.0
EXPOSE 80
CMD ["node", "./.output/server/index.mjs"]