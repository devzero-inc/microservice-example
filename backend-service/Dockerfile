FROM golang:alpine as builder

EXPOSE 9090

RUN apk add --no-cache git
WORKDIR /app

# copies all files from local into WORKDIR
COPY . .

RUN go mod tidy
RUN go build ./backend-service/cmd/server
RUN apk --no-cache add bash curl ca-certificates

# ENTRYPOINT ["./server"] # use after config is set up
ENTRYPOINT ["bash", "-c", "/app/server -grpc-port=9090 -db-host=grpc-service-db:3306 -db-user=admin -db-password=password -db-schema=grpc_service"]