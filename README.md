# node-postgress-store-backend


## About

A StoreFront backend application written in NodeJS and Typescript as a part of FullStack Javascript Nanodegree program. This application has APIs for Users, Products, and Orders and their respective CRUD operations.

### Prerequisites

You need the following modules and dependencies installed to run this project:
```
docker-compose   # To run the Postgres database on Docker
Node v14.16.0    # To run the application
Typescript       # App is written in Typescript
yarn             # For dependency management
```

### Installing Dependencies

Simply, run the following command to install the project dependencies after you have cloned the repository:
```
yarn
```

### Setup environment

## DB Credentials
POSTGRES_HOST = 127.0.0.1

#### Dev
``` POSTGRES_DB = storefront_db
    POSTGRES_USER = tauseef_ahmed
    POSTGRES_PASSWORD = password123
```
#### Test
``` POSTGRES_TEST_DB = storefront_db_test
    POSTGRES_TEST_USER = tauseef_ahmed_test
    POSTGRES_TEST_PASSWORD = password123
```
## Running the application

Use the following command to run the application:
```
yarn start
```

The application will run on http://localhost:8000/.

## Running the unit tests

Use the following command to run the unit tests:
```
yarn test
```

You may also use the Postman collection present in the repository for testing.

## Built With

* [NodeJS](https://nodejs.org/) - The JavaScript runtime
* [Yarn](https://yarnpkg.com/) - The dependency manager
* [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
* [Express](https://expressjs.com) - The web framework
* [TypeScript](https://www.typescriptlang.org/) - Types JS extension
* [Jasmine](https://jasmine.github.io/) - The unit testing framework

## Authors

*Toseef Ahmed



