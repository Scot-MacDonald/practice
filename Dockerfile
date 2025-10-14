# Use Debian-based Node image (not Alpine)
FROM node:18-bookworm-slim AS base

# Install pnpm globally
RUN npm install -g pnpm
WORKDIR /home/node/app

# ===== Dependencies =====
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ===== Build =====
FROM base AS builder
WORKDIR /home/node/app
COPY --from=deps /home/node/app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ===== Runtime =====
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /home/node/app

COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000
CMD ["pnpm", "start"]
