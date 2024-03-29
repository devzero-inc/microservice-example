package main

import (
	"fmt"
	"os"

	cmd "github.com/devzero-inc/grpc-service/backend-service/pkg/cmd/server"
)

func main() {
	if err := cmd.RunServer(); err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
	}
}
