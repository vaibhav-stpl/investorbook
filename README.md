First check the `./db` directory. If the sampledata file is zipped, unzip it so
that you have `./db/sampledata.sql`. Next, to start the postgres, hasura, and
webclient services, run `docker-compose up`. When you submit your solution, you
can integrate it to run with `docker-compose up` or include a brief README with
instructions for running it locally.

Feel free to access the data directly in Postgres
(postgresql://postgres:postgres@postgres:5433/postgres) or through the Hasura
GraphQL API. You can access the Hasura Console by installing the Hasura CLI
locally and running `hasura console` in the `./hasura` subdirectory.
