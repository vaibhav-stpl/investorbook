To run the solution, run the following in one terminal window:
```
./app
```

To see the output of API requests try on another terminal window:
```
curl localhost:8083/investors/9/connections
```
or
```
curl localhost:8083/investors/3511/mutual/428
```

Code Structure:
```
.
├── app
├── app.go
├── app_test.go
├── main.go
├── queries.go
└── queries_test.go
```

For more info about see individual files for comments.
