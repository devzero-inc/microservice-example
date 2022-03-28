FROM golang:alpine

RUN apk --no-cache add git bash curl ca-certificates
WORKDIR /app

# copies all files from local into WORKDIR
COPY . .
RUN go mod download

RUN go build ./backend-service/cmd/server

EXPOSE 9090
# ENTRYPOINT ["./server"] # use after config is set up
ENTRYPOINT ["bash", "-c", "/app/server -grpc-port=9090 -db-host=grpc-service-db:3306 -db-user=admin -db-password=password -db-schema=grpc_service"]