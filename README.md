<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# <center>Pokemon API</center>

### Instalación de dependencias

```bash
# instalar pnpm
$ npm install -g pnpm

# instalar nestjs cli
$ npm install -g @nestjs/cli

# instanciar base de datos
$ docker-compose up -d

# dependencias del proyecto
$ pnpm install
```

### Configuración de la aplicación

- Clonar el fichero `.env.example` y renombrarlo a `.env`
- Configurar las variables de entorno en el fichero `.env`

_Tabla con las variables de entorno disponibles:_

| Variable      | Descripción                    | Valor por defecto |
| ------------- | ------------------------------ | ----------------- |
| PORT          | Puerto de la aplicación        | 8080              |
| MONGODB_URI   | URI de la base de datos        | mongodb://        |
| MONGODB_DB    | Nombre de la base de datos     | pokemons          |
| DEFAULT_LIMIT | Número de elementos por página | 10                |
| ENVIROMENT    | Entorno de la aplicación       | development       |

### Ejecución de la aplicación

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Ejecución de pruebas

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
