package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	pb "github.com/devzero-inc/grpc-service/backend-service/pkg/api/service/v1"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc"

	"github.com/gorilla/mux"
)

func getAllMenuItems(w http.ResponseWriter, r *http.Request) {
	conn, err := grpc.Dial("backend-service:9090", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	log.Println(" connection state ====> ", conn.GetState())

	c := pb.NewOrderServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, _ := c.ReadAllMenuItems(ctx, &empty.Empty{})

	json.NewEncoder(w).Encode(res.MenuItemsList)
}

func createOrder(w http.ResponseWriter, r *http.Request) {
	conn, err := grpc.Dial("backend-service:9090", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	log.Println(" connection state ====> ", conn.GetState())

	c := pb.NewOrderServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var newOrder pb.CreateOrderRequest
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Invalid order request")
	}

	json.Unmarshal(reqBody, &newOrder)

	res, err := c.CreateOrder(ctx, &newOrder)
	if err != nil {
		fmt.Fprintf(w, "Failed to create order")
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res.Id)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/orders", createOrder).Methods("POST")
	router.HandleFunc("/menu-items", getAllMenuItems).Methods("GET")
	log.Fatal(http.ListenAndServe("api-service:8333", router))
}
