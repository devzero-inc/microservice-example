package main

import (
	"context"
	"flag"
	"log"
	"time"

	v1 "github.com/devzero-inc/grpc-service/backend/pkg/api/service/v1"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"
)

func main() {
	// get configuration
	address := flag.String("server", "", "gRPC server in format host:port")
	flag.Parse()

	// Set up a connection to the server.
	conn, err := grpc.Dial(*address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	log.Println(" connection state ====> ", conn.GetState())

	c := v1.NewUserServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Call Create
	req1 := v1.CreateUserRequest{
		User: &v1.User{
			Username: "Shelley",
			Email:    "shelldog@example.com",
		},
	}
	res1, err := c.Create(ctx, &req1)
	if err != nil {
		log.Fatalf("Create user failed: %v", err)
	}
	log.Printf("Created user id: <%+v>\n\n", res1)

	// Call to Read
	res4, err := c.ReadAll(ctx, &empty.Empty{})
	if err != nil {
		log.Fatalf("ReadAll failed: %v", err)
	}
	log.Printf("ReadAll result: <%+v>\n\n", res4)
}
