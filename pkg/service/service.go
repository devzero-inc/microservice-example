package v1

import (
	"context"
	"database/sql"
	"log"

	v1 "github.com/devzero-inc/grpc-service/pkg/api/service/v1"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// userServiceServer is implementation of v1.UserServiceServer proto interface
type userServiceServer struct {
	db *sql.DB
}

// NewUserServiceServer creates user service
func NewUserServiceServer(db *sql.DB) v1.UserServiceServer {
	return &userServiceServer{db: db}
}

// connect returns SQL database connection from the pool
func (s *userServiceServer) connect(ctx context.Context) (*sql.Conn, error) {
	c, err := s.db.Conn(ctx)
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to connect to database-> "+err.Error())
	}
	return c, nil
}

// Create new user
func (s *userServiceServer) Create(ctx context.Context, req *v1.CreateUserRequest) (*v1.CreateUserResponse, error) {
	conn, err := s.connect(ctx)
	if err != nil {
		log.Println("Error in connecting to database", err)
	}
	defer conn.Close()

	result, err := conn.ExecContext(context.Background(), "Insert into user(username, email) values(?,?)", req.User.GetUsername(), req.User.GetEmail())
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to insert into user-> "+err.Error())
	}

	// get ID of creates ToDo
	id, err := result.LastInsertId()
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to retrieve id for created ToDo-> "+err.Error())
	}

	return &v1.CreateUserResponse{
		Id: id,
	}, nil
}

func (s *userServiceServer) ReadAll(ctx context.Context, req *empty.Empty) (*v1.ReadAllUserResponse, error) {
	conn, err := s.connect(ctx)
	if err != nil {
		log.Println("Error in connecting to database", err)
	}
	defer conn.Close()

	rows, err := conn.QueryContext(context.Background(), "Select * from into user(user, email) values(?,?)")
	if err != nil {
		return nil, status.Error(codes.Unknown, "failed to insert into user-> "+err.Error())
	}
	defer rows.Close()

	userList := []*v1.User{}
	for rows.Next() {
		var user = new(v1.User)
		if err := rows.Scan(&user.Id, &user.Username, &user.Email); err != nil {
			return nil, status.Error(codes.Unknown, "failed to retrieve field values from ToDo row-> "+err.Error())
		}
		userList = append(userList, user)
	}

	if err := rows.Err(); err != nil {
		return nil, status.Error(codes.Unknown, "failed to retrieve data from ToDo-> "+err.Error())
	}

	return &v1.ReadAllUserResponse{
		Userlist: userList,
	}, nil
}
