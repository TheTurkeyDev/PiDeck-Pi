package main

import (
	"context"
	"fmt"
	"net"
)

const (
	SERVER_HOST = "192.168.1.130"
	SERVER_PORT = "9988"
	SERVER_TYPE = "tcp"
)

// App struct
type App struct {
	connection net.Conn
	ctx        context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	// establish connection
	connection, err := net.Dial(SERVER_TYPE, SERVER_HOST+":"+SERVER_PORT)
	if err != nil {
		panic(err)
	}

	app := &App{
		connection: connection,
	}

	go app.readCon()

	return app
}

func (a *App) readCon() {
	for {
		buffer := make([]byte, 1024)
		mLen, err := a.connection.Read(buffer)
		if err != nil {
			fmt.Println("Error reading:", err.Error())
		}
		fmt.Println("Received: ", string(buffer[:mLen]))
	}
}

func (a *App) send(data []byte) {
	a.connection.Write(data)
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) OnClick(id string) {
	a.send([]byte(`{"action":"press","id":"` + id + `"}`))
}
