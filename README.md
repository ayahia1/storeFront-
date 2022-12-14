# Storefront Backend

## How to start

### Build the database

On your local machine, you need to create two databases: one for development (store_dev) and one for testing (store_test). The two databases run on the **localhost** server on the default port **5432** and instructions to build both are listed below

- Connect to the database using the default postgres user through running this command

  `psql -U postgres`

- If you have already added a password to this user, you need to provide this password

- Run the following command to create a specific user for your node application

  `CREATE USER node WITH PASSWORD 'password';`

- Run the following commands to Create the two databases

  `CREATE DATABASE store_dev;`

  `CREATE DATABASE store_test;`

- Finally, Run the following to Grant full privilages to the **node** user on your two databases

  `GRANT ALL PRIVILEGES ON DATABASE store_dev TO node;`

  `GRANT ALL PRIVILEGES ON DATABASE store_test TO node;`

### Start the project

First, initalize the application and install the packages on your local machine, using `npm install`. Then, Create a .env file that includes the following variables

- PG_USER=node
- PG_PASSWORD=password
- PG_DB_DEV=store_dev
- PG_DB_TEST=store_test
- PG_HOST=127.0.0.1
- NODE_ENV=dev
- JWT_TOKEN=thisissecret
- SALT_ROUNDS=10
- PEPPER=thisispepper
- PORT=3000

### Migrations

The project is setup with db-migrate installed. So, once you initalize the project you can use the following commands to create the database schema

- To build the schema for the development database, run `npm run devdb-up`
- To build the schema for the development database, run `npm run testdb-up`
- To reset the schema for the development database, run `npm run devdb-reset`
- To reset the schema for the development database, run `npm run testdb-reset`

## Instructions

### Testing

The api developers created unit and integration tests for all routes and models included in the application.

- To run the tests on the typescript project before transpiling, use `npm run test-ts`
- To run the tests on the javascript transpiled code, use `npm run test`

### How to use

To start the application and get it running for your own uses, run `npm start`. All endpoints are listed in the [REQUIREMENTS](REQUIREMENTS.md) file along with the requirments for each one.

Please note that some endpoints require authorization token; admin privilages; and identity check for personal information. Tokens are passed in the request headers in the following format

`Authorization Bearer <token>`
