package cmd

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/devzero-inc/microservice-example/backend-service/pkg/protocol/grpc"
	v1 "github.com/devzero-inc/microservice-example/backend-service/pkg/service"
	"github.com/devzero-inc/microservice-example/config"
	_ "github.com/go-sql-driver/mysql"
)

func RunServer() error {
	ctx := context.Background()

	var cfg config.Config
	config.ReadFile(&cfg)
	config.ReadEnv(&cfg)
	fmt.Printf("Backend service config %+v, Database config %+v", cfg.BackendService, cfg.Database)

	if len(cfg.BackendService.Port) == 0 {
		return fmt.Errorf("invalid TCP port for backend server: '%s'", cfg.BackendService.Port)
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?%s",
		cfg.Database.Username,
		cfg.Database.Password,
		cfg.Database.Hostname,
		cfg.Database.DatabaseName,
		"parseTime=true")
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return fmt.Errorf("failed to open database: %v", err)
	}

	if err = db.Ping(); err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	defer db.Close()

	v1API := v1.NewOrderService(db)
	return grpc.RunServer(ctx, v1API, cfg.BackendService.Port)
}
