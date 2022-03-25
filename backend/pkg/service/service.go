package v1

import (
	"context"
	"database/sql"
	"log"

	v1 "github.com/devzero-inc/grpc-service/backend/pkg/api/service/v1"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// orderServiceServer is implementation of v1.OrderServiceServer proto interface
type orderServiceServer struct {
	db *sql.DB
}

// NewOrderService creates order service
func NewOrderService(db *sql.DB) v1.OrderServiceServer {
	return &orderServiceServer{db: db}
}

// connect returns SQL database connection from the pool
func (s *orderServiceServer) connect(ctx context.Context) (*sql.Conn, error) {
	c, err := s.db.Conn(ctx)
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to connect to database-> "+err.Error())
	}
	return c, nil
}

// Create an order
func (s *orderServiceServer) CreateOrder(ctx context.Context, req *v1.CreateOrderRequest) (*v1.CreateOrderResponse, error) {
	conn, err := s.connect(ctx)
	if err != nil {
		log.Println("Error in connecting to database", err)
	}
	defer conn.Close()

	orderResult, err := conn.ExecContext(context.Background(), "insert into orders (customer_name) values (?)", req.CustomerName)
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to create order -> "+err.Error())
	}

	orderID, err := orderResult.LastInsertId()
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to retrieve id for created order -> "+err.Error())
	}

	for _, item := range req.OrderItems {
		_, err := conn.ExecContext(context.Background(), "insert into order_items (order_id, menu_item_id, quantity) values (?, ?, ?)", orderID, item.MenuItemID, item.Quantity)
		if err != nil {
			return nil, status.Error(codes.Unknown, "failed to create order_items -> "+err.Error())
		}
	}

	return &v1.CreateOrderResponse{
		Id: orderID,
	}, nil
}

func (s *orderServiceServer) ReadAllMenuItems(ctx context.Context, req *empty.Empty) (*v1.ReadAllMenuItemsResponse, error) {
	conn, err := s.connect(ctx)
	if err != nil {
		log.Println("Error in connecting to database", err)
	}
	defer conn.Close()

	rows, err := conn.QueryContext(context.Background(), "select * from menu_items")
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to read from menu_items -> "+err.Error())
	}
	defer rows.Close()

	menuItemsList := []*v1.MenuItem{}
	for rows.Next() {
		var menuItem = new(v1.MenuItem)
		if err := rows.Scan(&menuItem.Id, &menuItem.Name, &menuItem.Description); err != nil {
			return nil, status.Error(codes.Unknown, "failed to retrieve field values from menu_items row-> "+err.Error())
		}
		menuItemsList = append(menuItemsList, menuItem)
	}

	if err := rows.Err(); err != nil {
		return nil, status.Error(codes.Unknown, "failed to retrieve data from menu_items table-> "+err.Error())
	}

	return &v1.ReadAllMenuItemsResponse{
		MenuItemsList: menuItemsList,
	}, nil
}
