# Reference: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:16.14.0-alpine
RUN apk add --no-cache libc6-compat

VOLUME ["/app"]
WORKDIR /app

RUN npm install

ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "dev"]