package main

import (
	"database/sql"
	"github.com/gorilla/mux"
	"testing"
)

func TestApp_RunServer(t *testing.T) {
	a := App{}
	a.InitializeAndRun()
	defer a.DBClose()
	type fields struct {
		Router *mux.Router
		DB     *sql.DB
	}
	type args struct {
		addr string
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{"test1", fields{a.Router, a.DB}, args{":8083"}, false,},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a := &App{
				Router: tt.fields.Router,
				DB:     tt.fields.DB,
			}
			if err := a.RunServer(tt.args.addr); (err != nil) != tt.wantErr {
				t.Errorf("RunServer() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}