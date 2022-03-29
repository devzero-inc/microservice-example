# DevZero GRPC Service
## Running the backend service with Docker
```
docker-compose up

# the server will start after the DB is up + running
$ docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS                   PORTS                               NAMES
1d81e1b9c4eb   grpc-service_api      "/app/api"               3 minutes ago   Up 3 minutes             0.0.0.0:8333->8333/tcp              grpc-service_api_1
f8f96f0e8fa2   grpc-service_server   "./server"               3 minutes ago   Up 3 minutes             0.0.0.0:9090->9090/tcp              grpc-service_server_1
39c73b290d35   adminer               "entrypoint.sh docke…"   4 minutes ago   Up 4 minutes             0.0.0.0:8080->8080/tcp              grpc-service_adminer_1
f523ddf76916   mysql                 "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp   db
```

## Running the Services
`docker-compose build && docker-compose up`
## Making requests to the API service
### Getting all menu items
```
curl 'api-service:8333/menu-items'
```
### Creating an order
```
curl -X POST 'api-service:8333/orders' \
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
[X] launch from config
[ ] general cleanup