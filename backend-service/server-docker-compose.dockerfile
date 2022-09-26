FROM golang:alpine

RUN apk --no-cache add git bash curl ca-certificates
WORKDIR /app

# copies all files from local into WORKDIR
COPY . .
RUN go mod download

RUN go build ./backend-service/cmd/server

EXPOSE 9090

ENTRYPOINT ["./server"]