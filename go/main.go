package main

import (
	"fmt"
	"log"
	"net"

	"actions/api"
	"actions/protos"

	"google.golang.org/grpc"
)

const (
	port = 7777
)

func main() {
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := api.Server{}
	// create a gRPC server object
	grpcServer := grpc.NewServer()
	protos.RegisterGithubActionsServer(grpcServer, &s)

	fmt.Println(fmt.Sprintf("GRPC started on port %d...", port))

	// start the server
	if err := grpcServer.Serve(lis); err != nil {
		fmt.Println("c")
		log.Fatalf("failed to serve: %s", err)
	}

	fmt.Println("Serving grpc server...")
}
