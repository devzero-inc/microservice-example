# Welcome to DevZero

Thank you for choosing DevZero as your preferred platform for software development. Our platform is designed to provide you with top-notch tools and services to help you build and deploy your software effectively.

## Getting Started

To get started on DevZero, you need to create an account on our website. Once you have created your account, you can start exploring our platform and its features. We offer a wide range of tools for software development, including code repositories, project management tools, and continuous integration and deployment services.

## Support

We understand that software development can be challenging, and we are here to help you every step of the way. Our support team is available 24/7 to assist you with any questions or issues you may have. You can reach out to us by email or through our support portal.

## Conclusion

We hope that you find our platform useful and enjoyable to use. We are committed to providing you with the best possible experience, and we welcome your feedback and suggestions on how we can improve our platform.

Happy coding!

# DevZero Microservice Example

  - [Architecture](#architecture)
  - [Getting started](#getting-started)
  - [Making changes](#making-changes)
    - [Frontend service](#frontend-service)
    - [Backend services (with Docker)](#backend-services-with-docker)
    - [Database](#database)
  - [Making requests to the API service](#making-requests-to-the-api-service)
    - [Getting all menu items](#getting-all-menu-items)
    - [Creating an order](#creating-an-order)
    - [Service healthcheck](#service-healthcheck)
  - [Local setup + running the backend service (without Docker)](#local-setup--running-the-backend-service-without-docker)
  - [Test: automatically fetch all menu items, create an order](#test-automatically-fetch-all-menu-items-create-an-order)
  - [Manually calling the service](#manually-calling-the-service) 

## Architecture
- Next.js web application
- Golang REST service
- Golang RPC service
- MySQL database

## Getting started
If you created an environment from DevZero's Microservice Template, all of the backend services will automatically be up and running!

To view and share the service, follow these steps to create a Share Link:


1. Click the "Open in web browser" button to launch the codeserver, a browser-based Visual Studio Code app. You can make changes to the service and view logs here:

![environment open in web browser](/images/open-in-web-browser.png)

2. Click on the dropdown and select 'Share':

![share dropdown](/images/share-link-dropdown.png)

3. Select port 3000 (where the web app is listening), then click 'Create link':

![create share link for port 3000](/images/create-share-link.png)

4. Run the frontend: `cd web-client; npm run dev`

5. You can now see the demo web app, Da$h Cafe, which will allow you to add items to the cart and place an order:

![dash cafe demo app](/images/dash-cafe.png)


## Making changes
### Frontend service
All code for the frontend lives in the `/web-client` directory.

```
# from web-client directory
npm run dev
```

### Backend services (with Docker)
To rebuild and run the backend services, run `make docker`. The backend server and API will start after the DB is up + running.
```
$ docker ps
CONTAINER ID   IMAGE                         COMMAND                  CREATED          STATUS                    PORTS                               NAMES
e207881b1113   microservice-example_api      "/app/api"               19 seconds ago   Up 19 seconds (healthy)   0.0.0.0:8333->8333/tcp              microservice-example_api_1
44871e520c2c   microservice-example_server   "./server"               19 seconds ago   Up 19 seconds             0.0.0.0:9090->9090/tcp              microservice-example_server_1
a93d72fb09b5   mysql                         "docker-entrypoint.s…"   48 seconds ago   Up 47 seconds (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp   db
5173f6d53321   adminer                       "entrypoint.sh docke…"   48 seconds ago   Up 47 seconds             0.0.0.0:8080->8080/tcp              microservice-example_adminer_1
```
### Database 
Log into Adminer `<hostname>/proxy/8080` (user: admin, password: password, database: backend_service) to view and change database records

## Making requests to the API service
### Getting all menu items

```
curl 'localhost:8333/menu-items'
```

### Creating an order

```
curl -X POST 'localhost:8333/orders' \
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

### Service healthcheck

```
curl  "localhost:8333/healthcheck" | jq .
{
  "statusCode": 200,
  "status": "OK"
}
```
-----

## Local setup + running the backend service (without Docker)

- requires golang + mysql to be installed locally

```
cd backend
make serve
```

## Test: automatically fetch all menu items, create an order

```
# new window
make run
```

## Manually calling the service

```
# install grpcurl
brew install grpcurl

# fetch a list of all menu items
grpcurl -plaintext 127.0.0.1:9090 v1.OrderService.ReadAllMenuItems

# create a new order
grpcurl -d '{"orderItems": {"menuItemID": 6, "quantity": 2}}' -plaintext 127.0.0.1:9090 v1.OrderService.CreateOrder
```

#testing
