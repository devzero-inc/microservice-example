# DevZero GRPC Service
## setup + running the service
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