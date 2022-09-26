package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	pb "github.com/devzero-inc/microservice-example/backend-service/pkg/api/service/v1"
	"github.com/devzero-inc/microservice-example/config"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/gorilla/mux"
	"google.golang.org/grpc"
)

const (
	_backendServiceDNS  = "backend-service"
	_backendServicePort = 9090
)

var (
	_backendURL = fmt.Sprintf("%s:%d", _backendServiceDNS, _backendServicePort)
)

func getAllMenuItems(w http.ResponseWriter, r *http.Request) {
	log.Println("API: gtting all menu items")
	conn, err := grpc.Dial(_backendURL, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	log.Println(" connection state ====> ", conn.GetState())

	c := pb.NewOrderServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	res, err := c.ReadAllMenuItems(ctx, &empty.Empty{})
	if err != nil {
		log.Printf("Failed to read menu items: %v ", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(res.MenuItemsList)
}

func createOrder(w http.ResponseWriter, r *http.Request) {
	log.Println("API: creating order")
	conn, err := grpc.Dial(_backendURL, grpc.WithInsecure())
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
		log.Println(w, "Invalid order request")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	json.Unmarshal(reqBody, &newOrder)

	res, err := c.CreateOrder(ctx, &newOrder)
	if err != nil {
		fmt.Fprintf(w, "Failed to create order")
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res.Id)
}

func healthcheck(w http.ResponseWriter, r *http.Request) {
	healthcheck := &pb.Healthcheck{
		StatusCode: http.StatusOK,
		Status:     http.StatusText(http.StatusOK),
	}

	conn, err := grpc.Dial(_backendURL, grpc.WithInsecure())
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

	host := fmt.Sprintf("%s:%s", cfg.APIService.Hostname, cfg.APIService.Port)
	log.Fatal(http.ListenAndServe(host, router))
}
