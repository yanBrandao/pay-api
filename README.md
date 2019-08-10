# pay-api
[![Build Status](https://travis-ci.org/yanBrandao/pay-api.svg?branch=dev)](https://travis-ci.org/yanBrandao/pay-api)

## Introduction

Payment API is a Web API for payment, this api was made using [Express](https://expressjs.com/pt-br/) framework and [Sequelize](https://sequelize.org/) for ORM, database used was postgres and for test was used [HerokuApp](https://herokuapp.com/) for cloud database. Documentation was made with [SwaggerUI](https://swagger.io/tools/swagger-ui/) to help user api test endpoints and complete visualization of project. For unit test was user [Mocha](https://mochajs.org/) and [Istanbul](https://istanbul.js.org/) for coverage report. For CI and validation of project was used [TravisCI](https://travis-ci.org/)

Pay-api has two main goals, that is to store every transaction made by clients into a database, but of course save only necessary informations, like last 4 digits of a credit card, validation date, amount paid in transaction, payment method and name who made the transaction.

Using this api, its possible to see all payables to a specific client, passing only client id it can possible to see what was paid and waiting funds.

The application is working like requested, but there are more things to do, before implement in production, like do some validations to optimize credit card data, create a routine if waiting funds date pass, change to paid without change fee.

## Running instructions

### Requisites

- At least node 8
- yarn or npm

### Briefing

`yarn install` or `npm install`
`yarn test` or `npm run test`

Testing endpoints: [http://localhost:3000/api/](http://localhost:3000/api/)

