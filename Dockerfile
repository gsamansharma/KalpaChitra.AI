FROM node:22-alpine AS client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

FROM node:22-alpine AS server-builder
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm install
COPY server/ ./

FROM node:22-alpine
WORKDIR /app
COPY --from=server-builder /app/server ./
COPY --from=client-builder /app/client/build ./public
EXPOSE 8080
CMD ["node", "index.js"]

