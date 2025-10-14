# Base image with Node.js and pnpm
FROM node:18.16-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm
ENV PNPM_HOME=/home/node/.pnpm-store
ENV PATH=$PNPM_HOME:$PATH

# Builder stage
FROM base AS builder
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copy all source code and build
COPY . .
RUN pnpm build

# Runtime stage
FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3000        

WORKDIR /home/node/app

# Install only production dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --prod

# Expose port 3000
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
