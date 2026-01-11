# Build stage
FROM node:20-alpine AS builder

RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

USER nextjs

# Copy only needed files
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/package-lock.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
