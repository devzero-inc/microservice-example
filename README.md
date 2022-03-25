# DevZero GRPC Service
## Running the service with Docker
```
docker-compose up

# the server will start after the DB is up + running
$ docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                                  NAMES
75d0bffe6836   grpc-service_server   "bash -c '/app/serve…"   3 seconds ago    Up 2 seconds              0.0.0.0:443->443/tcp, 9090/tcp, 0.0.0.0:80->9000/tcp   grpc-service_server_1
fdb509c5bd57   adminer               "entrypoint.sh docke…"   32 seconds ago   Up 31 seconds             0.0.0.0:8080->8080/tcp                                 grpc-service_adminer_1
4ef48bf1fb54   mysql                 "docker-entrypoint.s…"   32 seconds ago   Up 31 seconds (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp                      db
```

## Local setup + running the service (without Docker)
- requires golang + mysql to be installed locally
```
make service
```

## automatically create a new user, fetch all users
```
# new window
make run
```

## manually calling the service
```
# install grpcurl
brew install grpcurl

# fetch a list of all users
grpcurl -plaintext 127.0.0.1:9090 v1.UserService.ReadAll

# create a new user
grpcurl -d '{"user": {"username": "BuddyTheElf","email": "buddy@northpole.io"}}' -plaintext 127.0.0.1:9090 v1.UserService.Create
```

## TODO:
- dockerize the service
- dockerize the DB
- general cleanup
- add a "theme" / use case