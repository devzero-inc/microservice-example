FROM golang:alpine

RUN apk --no-cache add git bash curl ca-certificates
WORKDIR /app

# copies all files from local into WORKDIR
COPY . .
RUN go mod download

RUN go build ./backend-service/cmd/server

RUN curl -fLo install.sh https://raw.githubusercontent.com/cosmtrek/air/master/install.sh \
    && chmod +x install.sh && sh install.sh && cp ./bin/air /bin/air

CMD air

EXPOSE 9090

ENTRYPOINT ["./server"]