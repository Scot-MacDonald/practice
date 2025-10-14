# ===============================
# 1️⃣ Base image
# ===============================
FROM node:18.20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm
ENV PNPM_HOME=/home/node/.pnpm-store
ENV PATH=$PNPM_HOME:$PATH
WORKDIR /home/node/app

# ===============================
# 2️⃣ Dependencies (builder)
# ===============================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ===============================
# 3️⃣ Build stage
# ===============================
FROM base AS builder

# Copy dependencies from deps stage
COPY --from=deps /home/node/app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN pnpm build

# ===============================
# 4️⃣ Runtime (production)
# ===============================
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /home/node/app

# Copy only the files needed for runtime
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/public ./public
COPY --from=builder /home/node/app/package.json ./package.json
COPY --from=builder /home/node/app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Expose Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
