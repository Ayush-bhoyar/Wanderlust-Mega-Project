FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY . .

RUN npm run test 


#-----------STAGE 2----------------#

FROM node:18-alpine 

WORKDIR /app

COPY --from=builder /app .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

ENV NODE_ENV=production

CMD ["npm", "start"]

