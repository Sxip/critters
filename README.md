<div align="center">
  <br />
  <p>
    <a href="#"><img src="https://user-images.githubusercontent.com/38108408/79511435-33de8880-8037-11ea-91b2-a97274fef874.png" width="175" alt="Critters" /></a>
  </p>
</div>

## About

Critters is a server implementation of [Box Critters](https://boxcritters.com) written entirely using [TypeScript](https://www.typescriptlang.org). The aim of this project is to create a server that is both fun and easy to use.

## Features

- Plugin Support (Getting there...).
- Multiplayer support.
- A basic REST service.
- Nickname colours.

## Showcase

![](https://user-images.githubusercontent.com/38108408/79524763-3fdb4200-8059-11ea-9ddc-bd2b23af3d07.png)

![](https://user-images.githubusercontent.com/38108408/79699319-c88af580-8286-11ea-84da-1f38d66d4ec9.png)


## Getting Started

**Note** Make sure you have the following installed and setup.

1. [Node.js](NodeJS) **version 13 or higher**
2. [PostgreSQL](https://www.postgresql.org)
3. [Yarn](https://yarnpkg.com)
4. [Client files](https://mega.nz/file/3JQCWaTB#q_enKTUtv120YFduFvGIqZdEnC0DL8sXYTE_AmnzenQ)

### Steps

1. Clone the Github repository: https://github.com/crittersbox/critters
2. Unzip the client files inside the `public` directory.
3. Install dependencies by navigating to the project in your Terminal or command prompt and running the command `yarn install`
4. Go into your `config.development.json` file and configure your database connection settings.
5. Setup the migrations by running the command `yarn migration:run`
6. Setup the seeds by running the command `yarn seed`

If you have followed the steps correctlty, you can begin serving for connections by typing the command `serve:dev`.

## Rest API

Critters comes with a built-in REST API service for web applications.

### API Endpoints

- `POST /login` : Authenticates a user account
- `POST /register` : Creates a new user account
