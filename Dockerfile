# ===============================
# Base stage
# ===============================
FROM node:18-bookworm-slim AS base

# Install system deps for Sharp and other native packages
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  libc6-dev \
  libvips-dev \
  && rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /home/node/app

# ===============================
# Dependencies stage
# ===============================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
# Allow build scripts for native modules like sharp
RUN pnpm install --frozen-lockfile --ignore-scripts=false

# ===============================
# Builder stage
# ===============================
FROM base AS builder

COPY --from=deps /home/node/app/node_modules ./node_modules
COPY . .

# Ensure sharp binaries are built for linux-x64
RUN npm rebuild sharp --platform=linux --arch=x64

# Build Next.js
RUN pnpm build

# ===============================
# Runtime stage
# ===============================
FROM base AS runtime

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /home/node/app

COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/package.json ./package.json
COPY --from=builder /home/node/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /home/node/app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]
