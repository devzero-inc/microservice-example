FROM golang:alpine as builder

RUN apk add --no-cache git

WORKDIR $GOPATH/src/github.com/devzero-inc/grpc-service/
COPY . .

RUN go mod tidy
RUN go build ./cmd/server

EXPOSE 9090

ENTRYPOINT ["./cmd/server"]
CMD ["./cmd/server/main"]

FROM alpine:latest
RUN apk --no-cache add bash curl ca-certificates

WORKDIR /root/
COPY --from=builder /go/src/github.com/devzero-inc/grpc-service/server .
ENTRYPOINT ["bash", "-c", "/root/server -grpc-port=9090 -db-host=127.0.0.1:3306 -db-user=admin -db-password=password -db-schema=grpc_service"]



# scratch
# ENTRYPOINT ["bash", "-c", "/root/server -grpc-port=$grpc_port_env -db-host=$db_host -db-user=$db_user -db-password=$db_password -db-schema=$db_schema"]
# FROM golang:alpine as builder

# EXPOSE 8080 80 443

# WORKDIR ${GOPATH}
# WORKDIR /app

# COPY go.mod go.sum ./

# RUN apt-get update -y && \
# 	apt-get install -y \
# 	vim

# Copy the entrypoint file
# ADD /cmd/server/run_service.sh /run_service.sh
# RUN chmod +x /run_service.sh

# # Copy the source from the current directory to the Working Directory inside the container
# COPY . .

# # Build the Go app
# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

# ######## Start a new stage from scratch #######
# FROM alpine:latest  

# WORKDIR /root/

# # Copy the Pre-built binary file, and config from the previous stage
# COPY --from=builder /app/main .
# RUN mkdir /root/config
# COPY --from=builder /app/config/* /root/config/

# # Expose port 10000 to the outside world
# EXPOSE 10000

# # Command to run the executable
# CMD ["./main"]




# Start process
# ENTRYPOINT ["/run_service.sh"]

# Start from the latest golang base image
# FROM golang:1.17 as builder

# # Add Maintainer Info
# LABEL maintainer="devinfra <www.devinfra.io>"

# # Set the Current Working Directory inside the container
# # WORKDIR /app

# # Copy go mod and sum files
# # COPY go.mod go.sum ./

# ARG GIT_PERSONAL_ACCESS_TOKEN
# RUN git config --global url."https://${GIT_PERSONAL_ACCESS_TOKEN}:@github.com/".insteadOf "https://github.com/"

# # Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
# # what's the weird mount thing? see below. also, it requires BuildKit.
# # https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/syntax.md#run---mounttypecache
# RUN --mount=type=cache,target=/root/.cache/go-mod GOPRIVATE=github.com/devzero-inc go mod download

# # Copy the source from the current directory to the Working Directory inside the container
# COPY . .

# # Build the Go app
# RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main .

# ######## Start a new stage from scratch #######
# FROM alpine:latest  

# RUN apk --no-cache add ca-certificates

# WORKDIR /root/

# # Copy the Pre-built binary file, and config from the previous stage
# COPY --from=builder /app/main .
# RUN mkdir /root/config
# COPY --from=builder /app/config/* /root/config/

# # Expose port 10000 to the outside world
# EXPOSE 10000

# # Command to run the executable
# CMD ["./main"]