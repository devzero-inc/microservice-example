mkfile_path := $(abspath $(lastword $(MAKEFILE_LIST)))
root_dir := $(dir $(mkfile_path))
proto_out = ${root_dir}pkg/api

mysql:
	$(call colorecho, "Installing MySQL schema...")
	mysql -h 127.0.0.1 -P 3306 -uroot -ppassword -D grpc_service < ${root_dir}cmd/server/storage/schema.sql

proto:
	protoc --go_out=${proto_out} --go-grpc_out=${proto_out} \
	--go-grpc_opt=require_unimplemented_servers=false \
	--proto_path=${root_dir}api/proto service.proto
	