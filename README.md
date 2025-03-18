<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Description

Loan Test

## 1 Project setup

```bash
$ npm install
```


## 2 Setup DB

``` bash
# Install Docker
https://www.docker.com/products/docker-desktop/
```

``` bash
# install PostgreSQL 14.3 with docker
$ docker run --name postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres:14.3

```

## 3 Setup .env

```bash
# Setup your envoirements 

Create .env and check .template.env for create correctly
```


## 4 Run DB

```bash
# run DB
$ docker-compose up -d
```

## 4 Compile and run the project


```bash

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test



# LoanExam
