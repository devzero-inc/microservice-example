FROM node:19.4

WORKDIR /app
# copies all files from local into WORKDIR
COPY . .
RUN npm install --include=dev

EXPOSE 3000

ENTRYPOINT ["./node_modules/.bin/next", "dev"]