FROM node:20-alpine AS base

# Base setup
RUN apk update && apk add --no-cache libc6-compat

# Builder stage
FROM base AS builder
WORKDIR /app

# Install turbo globally
RUN yarn global add turbo

# Copy project files
COPY . .

# Prune unnecessary files for docker
RUN turbo prune --scope=api --docker

# Installer stage
FROM base AS installer
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy full source files
COPY --from=builder /app/out/full/ .

# Build the application
RUN yarn turbo run build --filter=api...

# Runner stage
FROM base AS runner
WORKDIR /app

# Add user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api

# Copy built files from installer stage
COPY --from=installer --chown=api:nodejs /app .

EXPOSE 5002

ENV PORT=5002
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Command to start the application
CMD [ "node", "/app/apps/api/dist/main.js" ]
