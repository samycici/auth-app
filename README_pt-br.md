# Auth App 
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fsamycici%2Fauth-app%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/samycici/auth-app/master) 
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=samycici_auth-app&metric=alert_status)](https://sonarcloud.io/dashboard?id=samycici_auth-app)
[![CircleCI](https://circleci.com/gh/samycici/auth-app.svg?style=svg)](https://circleci.com/gh/samycici/auth-app)


> Aplicativo gerado automaticamente utilizando o módulo @fullstackjs/create-fullstackjs-app para demonstrar alguns conceitos sobre Testes

### Você irá precisar:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Para executar o App

Primeiro você precisa criar um conta [smtp.mailtrap.io](https://mailtrap.io/)  e gerar suas credenciais

Feito isso, você já pode criar o seu arquivo .env

```shell
cp .env.example .env
```

e substituir `MAIL_USERNAME` e `MAIL_PASSWORD` pelas suas credenciais do mailtrap.

Feito isso já podemos executar o servidor:

```shell
make build-server
```

Agora, você já pode tentar criar um novo usuário
```shell
curl --location --request POST 'http://localhost:9000/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Name Example",
    "email": "email@gmail.com",
    "password": "password"
}'
```

### Para executar os testes

```shell
make test
```

### Organização dos Testes

```
auth-app
└───__mocks__
└───__tests__
    └───functional
    └───integration
    └───unit
    └───utils
└───coverage
```
Onde:

__mocks__ o serviço de email será mocado, então os testes unitários não irão chamar o pacote real de email.

__unit__ temos os testes unitários trabalhando com mocks e stubs

__integration__ temos um testes de integração chamando o banco de dados e um outro para chamar a API

__functional__ temos os testes funcionais usando o [supertest](https://github.com/visionmedia/supertest)

__coverage__ o report de cobertura é gerado pelo [jest](https://jestjs.io/)

### Teste de Mutação

Os testes de mutação podem ser executados usando:

```shell
make mutation
```

e depois acesse a [Dashboard Report](https://dashboard.stryker-mutator.io/reports/github.com/samycici/auth-app/master)

<p align="center">
  <a href="https://github.com/samycici/auth-app">
    <img src=".github/stryker.png" alt="Sonar">
  </a>
</p>

### Análise do Sonar

A análise desse projeto esta sendo realizado pelo [SonarCloud](https://sonarcloud.io/)

<p align="center">
  <a href="https://github.com/samycici/auth-app">
    <img src=".github/sonar.png" alt="Sonar">
  </a>
</p>
