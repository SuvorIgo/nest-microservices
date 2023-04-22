<p align="center">
  <a href="https://github.com/SuvorIgo/nest-microservices">
    <img src="https://imageup.ru/img47/4305708/desktop-1.jpg" alt="NestMicroservicesLogo" width=900px>
  </a>

  <h1 align="center">Project Nest.js Microservices</h1>
</p>

## Getting Started

Чтобы начать разработку проекта, пожалуйста, проверьте, установлены ли эти инструменты на вашем компьютере:

* [Docker](https://www.docker.com/get-started)

### Installation

1. Склонируйте этот репозиторий

```sh
git clone https://github.com/SuvorIgo/nest-microservices
```

2. Откройте проект в редакторе кода

3. Загрузите образы и запустите контейнеры

```sh
docker-compose up
```

### Health testing

1. По этому запросу можно найти документацию REST API

```sh
localhost:8000/api/docs
```

2. Для начала, необходимо перейти в браузер, либо же на платформу API (например Postman). Ввести:

```sh
localhost:8000/api/insert-testing-data
```
Данный endpoint предполагает внесение тестовых базовых данных для проверки/дальнейшей работы с продуктом.

3. Чтобы перейти к ui rabbitMQ, необходимо ввести в адресную строку браузера:

```sh
localhost:15672
```
Логин: ```guest```
Пароль: ```guest```

4. Чтобы просмотреть вносимые данные в PostgreSQL, можно воспользоваться программой pgAdmin4:
1) ```localhost:8080```
2) Ввести пароль: ```root```
3) Создать сервер: 
3.1) Задать любое наименование сервера
3.2) В поле HOST указать соответствующий контейнер (у меня он называется ```postgres```). В поле password указать ```root```
  
<p align=center>
  <img src="https://imageup.ru/img29/4305719/skrinshot-22-04-2023-041423.jpg" width=50%>
  <img src="https://imageup.ru/img74/4305720/skrinshot-22-04-2023-041744.jpg" width=50%>
</p>
  
4. После создания сервера можно увидеть три БД - postgres (default), ProfileMS и AuthorizationMS.

## The following technologies were used to create the project:

- Nest.js
- Micro-service architecture
- RabbitMQ
- JWT Token
- REST API
- Swagger
- TypeScript
- PostgreSQL + pgAdmin4
- Sequelize
- Docker
- VS Code
