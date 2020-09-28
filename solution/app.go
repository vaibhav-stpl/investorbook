package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

// constants for connection to DB
const (
	host     = "localhost"
	port     = 5432
	addr     = ":8083"
	username = "postgres"
	password = "postgres"
	dbname   = "postgres"
)

// App struct stores router and DB
type App struct {
	Router *mux.Router
	DB     *sql.DB
}

// Not fully implemented
func (a App) SearchHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	_, err := w.Write([]byte(fmt.Sprintf("Investor id: %v, searchString: %v\n", vars["investorId"], vars["searchString"])))
	if err != nil {
		log.Fatal(err)
	}
}

// Get the mutual connection and writes them
// to test, run app (./app) and then on terminal run `curl localhost:8083/investors/3511/mutual/428`
func (a App) MutualConnectionHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	mutualConnList, err := GetMutualConn(a.DB, vars["investorId"], vars["otherInvestorId"])
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(mutualConnList)
	if err != nil {
		log.Fatal(err)
	}
}

// Get the first degree connections and writes them
// To test, run app (./app) and then on terminal run `curl localhost:8083/investors/9/connections`
func (a App) FirstDegreeHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.WriteHeader(http.StatusOK)
	degreeOneConnList, err := GetFirstDegree(a.DB, vars["investorId"])
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(degreeOneConnList)
	if err != nil {
		log.Fatal(err)
	}
}

// Initializes the router and DB and runs the server/listener
func (a *App) InitializeAndRun() {
	var err error
	connString := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, username, password, dbname)

	a.DB, err = sql.Open("postgres", connString)
	if err != nil {
		log.Fatal(err)
	}

	a.Router = mux.NewRouter()
	a.initializeRoutes()
	if err = a.RunServer(addr); err != nil {
		log.Fatal(err)
	}
}

// Initialize the routes
func (a *App) initializeRoutes() {
	a.Router.HandleFunc("/investors/{investorId:[0-9]+}/connections", a.FirstDegreeHandler).Methods("GET")
	a.Router.HandleFunc("/investors/{investorId:[0-9]+}/mutual/{otherInvestorId:[0-9]+}", a.MutualConnectionHandler).Methods("GET")
	a.Router.HandleFunc("investors/{investorId:[0-9]+}/search?q={searchString}", a.SearchHandler).Methods("GET")
}

// Run server on port: addr
func (a *App) RunServer(addr string) error {
	return http.ListenAndServe(addr, a.Router)
}

// Close DB, used only for testing
func (a *App) DBClose()  {
	if err := a.DB.Close(); err != nil {
		log.Fatal(err)
	}
}
