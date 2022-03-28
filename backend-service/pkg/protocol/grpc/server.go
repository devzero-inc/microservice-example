package grpc

import (
	"context"
	"log"
	"net"
	"os"
	"os/signal"

	v1 "github.com/devzero-inc/grpc-service/backend-service/pkg/api/service/v1"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func RunServer(ctx context.Context, v1API v1.OrderServiceServer, port string) error {
	listen, err := net.Listen("tcp", ":"+port)
	if err != nil {
		return err
	}

	// register service
	server := grpc.NewServer()
	reflection.Register(server)
	v1.RegisterOrderServiceServer(server, v1API)

	// graceful shutdown
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	go func() {
		for range c {
			// sig is a ^C, handle it
			log.Println("shutting down backend service...")

			server.GracefulStop()

			<-ctx.Done()
		}
	}()

	log.Println("starting backend service...")
	return server.Serve(listen)
}
