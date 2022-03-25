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

	c := v1.NewOrderServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	readMenuItemsResponse, err := c.ReadAllMenuItems(ctx, &empty.Empty{})
	if err != nil {
		log.Fatalf("ReadAll failed: %v", err)
	}
	log.Printf("ReadAllMenuItems result: <%+v>\n\n", readMenuItemsResponse)

	createOrderReq := v1.CreateOrderRequest{
		OrderItems: []*v1.OrderItem{
			{
				MenuItemID: 1,
				Quantity:   1,
			},
			{
				MenuItemID: 3,
				Quantity:   2,
			},
		},
	}
	createOrderRes, err := c.CreateOrder(ctx, &createOrderReq)
	if err != nil {
		log.Fatalf("Create order failed: %v", err)
	}
	log.Printf("Created order id: <%+v>\n\n", createOrderRes)

}
