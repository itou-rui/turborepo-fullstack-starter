FROM node:20-alpine AS builder
RUN apk update

# Set working directory
WORKDIR /app

RUN yarn global add turbo

COPY . .

# Only Take packages that are needed to compile this app
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:20-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json

RUN yarn install --frozen-lockfile

FROM node:20-alpine AS sourcer

RUN apk update

WORKDIR /app

COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore

RUN yarn turbo run build --filter=web...

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=sourcer /app/ .

WORKDIR /app/apps/web/

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production
ENV CRITTERS_RUNTIME=1

CMD [ "npm", "start" ]
