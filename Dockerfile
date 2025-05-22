FROM oven/bun:latest as builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lock* package-lock.json* yarn.lock* ./

# Install dependencies
RUN bun install

# Copy source files
COPY . .

# Build the application with Vite
RUN bun run build

FROM oven/bun:latest

WORKDIR /app

# Copy the built assets from builder
COPY --from=builder /app/dist /app/dist

# Install a simple static file server
RUN npm install -g serve

EXPOSE 3000

# Serve the static files from the dist directory
CMD ["serve", "-s", "dist", "-l", "3000"]
