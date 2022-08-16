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
	"github.com/devzero-inc/grpc-service/config"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/rs/cors"
	"google.golang.org/grpc"

	"github.com/gorilla/mux"
)

func getAllMenuItems(w http.ResponseWriter, r *http.Request) {
	log.Println("API: gtting all menu items")
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
	log.Println("API: creating order")
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

func healthcheck(w http.ResponseWriter, r *http.Request) {
	healthcheck := &pb.Healthcheck{
		StatusCode: http.StatusOK,
		Status:     http.StatusText(http.StatusOK),
	}

	conn, err := grpc.Dial("backend-service:9090", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
		healthcheck = &pb.Healthcheck{
			StatusCode: http.StatusInternalServerError,
			Status:     http.StatusText(http.StatusInternalServerError),
		}

	}
	defer conn.Close()

	log.Printf("Healthcheck status: '%s'", healthcheck.Status)

	w.WriteHeader(int(healthcheck.StatusCode))
	json.NewEncoder(w).Encode(healthcheck)
}

func main() {
	var cfg config.Config
	config.ReadFile(&cfg)
	config.ReadEnv(&cfg)
	fmt.Printf("API Service config %+v", cfg.APIService)

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/orders", createOrder).Methods("POST")
	router.HandleFunc("/menu-items", getAllMenuItems).Methods("GET")
	router.HandleFunc("/healthcheck", healthcheck).Methods("GET")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"*"},
		// AllowCredentials: true,
	})
	handler := corsHandler.Handler(router)

	host := fmt.Sprintf("%s:%s", cfg.APIService.Hostname, cfg.APIService.Port)
	log.Fatal(http.ListenAndServe(host, handler))
}
