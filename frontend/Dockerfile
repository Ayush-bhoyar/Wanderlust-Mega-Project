# ---------- Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application (API path will be set at runtime)
RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:alpine

# Install Node.js for runtime environment configuration
RUN apk add --no-cache nodejs

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the environment configuration script
COPY scripts/set-env.js /usr/local/bin/set-env.js
RUN chmod +x /usr/local/bin/set-env.js

# Create startup script
RUN echo '#!/bin/sh' > /usr/local/bin/start.sh && \
    echo 'node /usr/local/bin/set-env.js' >> /usr/local/bin/start.sh && \
    echo 'nginx -g "daemon off;"' >> /usr/local/bin/start.sh && \
    chmod +x /usr/local/bin/start.sh

EXPOSE 80

# Use the startup script that configures environment and starts nginx
CMD ["/usr/local/bin/start.sh"]
