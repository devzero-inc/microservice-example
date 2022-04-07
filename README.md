# DevZero Microervice Example

## Running the services (API, backend, database)

```
`docker-compose build && docker-compose up`

# the server will start after the DB is up + running
$ docker ps
CONTAINER ID   IMAGE                         COMMAND                  CREATED          STATUS                    PORTS                               NAMES
e207881b1113   microservice-example_api      "/app/api"               19 seconds ago   Up 19 seconds (healthy)   0.0.0.0:8333->8333/tcp              microservice-example_api_1
44871e520c2c   microservice-example_server   "./server"               19 seconds ago   Up 19 seconds             0.0.0.0:9090->9090/tcp              microservice-example_server_1
a93d72fb09b5   mysql                         "docker-entrypoint.s…"   48 seconds ago   Up 47 seconds (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp   db
5173f6d53321   adminer                       "entrypoint.sh docke…"   48 seconds ago   Up 47 seconds             0.0.0.0:8080->8080/tcp              microservice-example_adminer_1
```

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

## Front End Stuff
The Next.js app is already running in development mode in the backgroun via [forever](https://github.com/foreversd/forever):
```
devzero@ip-10-0-112-234:~/projects/microservice-example/web-client$ forever list
info:    Forever processes running
data:        uid  command       script                     forever pid   id logfile                         uptime                  
data:    [0] UFVW /usr/bin/node node_modules/.bin/next dev 88084   89558    /home/devzero/.forever/UFVW.log 0:0:6:32.69900000000001 
```

Any changes you make will be detected + recompiled just as if you had run `npm run dev` manually.
You can tail the logs from the `/web-client` directory with:
```
tail -f stdout.txt
```

You can also restart (or stop) the service using forever:
```
forever (restart|stop) 0
```

To start the service again, from the `/web-client` folder run:
```
forever node_modules/.bin/next dev > stdout.txt 2> stderr.txt &
```

For more info on manually running the web-client, check out this [README](./web-client/README.md)!