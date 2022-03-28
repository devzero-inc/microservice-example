FROM golang:alpine

RUN apk --no-cache add git bash curl ca-certificates
WORKDIR /app

COPY . .
RUN go mod download

RUN go build ./api-service/api

EXPOSE 8333

ENTRYPOINT ["/app/api"]