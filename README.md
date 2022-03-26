# DevZero GRPC Service
## Running the backend service with Docker
```
docker-compose up

# the server will start after the DB is up + running
$ docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                                                  NAMES
75d0bffe6836   grpc-service_server   "bash -c '/app/serve…"   3 seconds ago    Up 2 seconds              0.0.0.0:443->443/tcp, 9090/tcp, 0.0.0.0:80->9000/tcp   grpc-service_server_1
fdb509c5bd57   adminer               "entrypoint.sh docke…"   32 seconds ago   Up 31 seconds             0.0.0.0:8080->8080/tcp                                 grpc-service_adminer_1
4ef48bf1fb54   mysql                 "docker-entrypoint.s…"   32 seconds ago   Up 31 seconds (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp                      db
```

## Running the API service (no docker yet)
After `docker-compose up` is successful:
```
cd api-service
go run .
```
## Making requests to the API service (no docker yet)
### Getting all menu items
```
curl '127.0.0.1:8333/menu-items'
```
### Creating an order
```
curl -X POST '127.0.0.1:8333/orders' \
-H 'Content-Type: application/json' \
-D '{"orderItems": [
    {
        "menuItemID": 1,
        "quantity": 1
    },
    {
        "menuItemID": 4,
        "quantity": 2
    }
], "customerName": "Sharon"}'
```


## Local setup + running the backend service (without Docker)
- requires golang + mysql to be installed locally
```
cd backend
make serve
```

## automatically fetch all menu items, create an order
```
# new window
make run
```

## manually calling the service
```
# install grpcurl
brew install grpcurl

# fetch a list of all menu items
grpcurl -plaintext 127.0.0.1:9090 v1.OrderService.ReadAllMenuItems

# create a new order
grpcurl -d '{"orderItems": {"menuItemID": 6, "quantity": 2}}' -plaintext 127.0.0.1:9090 v1.OrderService.CreateOrder
```

## TODO:
[X] dockerize the service
[X] dockerize the DB
[X] add a "theme" / use case
[ ] launch from config
[ ] general cleanup