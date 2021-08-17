## Prerequisites

#### Docker & Docker-Compose Setup:

- Docker installation: https://docs.docker.com/get-docker/.
- Docker-compose installation: https://docs.docker.com/compose/install/.
- To get started quickly with sending requests, you can import the postman collection ***BOSTA monitor.postman_collection*** file to **https://web.postman.co/home**

## How to run

- run docker compose:
   ```
   docker-compose -d up
   ```

- Or run the following without docker compose
   ```bash
   yarn
   yarn start:dev
   ```

- The service is now up and running on ***localhost:3009***

- All the api endpoints are available when visiting ***localhost:3009/api***

## Tests

```bash
# unit tests
yarn test
```





## Configuration

- The following configuration variables can be passed: 
   - PORT 
   - JWT_SECRET
   - JWT_EXPIRY
   - SENDGRID_KEY
   - SENDGRID_EMAIL
   - DB_HOST
   - DB_PORT
   - DB_USERNAME
   - DB_PASSWORD

## OpenAPI Definitions

- Visit `GET localhost:3009/api` to view the swagger definitions of this api
