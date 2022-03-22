mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
root_dir := $(dir $(mkfile_path))
proto_out = ${root_dir}pkg/api

proto:
	protoc --go_out=${proto_out} --go-grpc_out=${proto_out} --proto_path=${root_dir}api/proto service.proto