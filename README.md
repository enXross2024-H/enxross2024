# enXross2024 Team H Project

## How to setup the project (only once)

1. create openSSL certificate

```bash
mkdir -p certs
openssl req -newkey rsa:2048 -nodes -keyout certs/server.key -x509 -days 365 -out certs/server.crt
```

2. Create a `.env` file in the project with the following content:

```.env
NEXT_PUBLIC_8TH_WALL_APP_KEY=
```

3. Install the dependencies

```bash
docker compose build
docker compose exec service-client yarn install
```

## How to run the project

1. Run the project:

```bash
docker compose up -d
```

2. Open the browser at [https://localhost:3000](https://localhost:3000)

   Setting up 8th Wall for local hosting to be served over HTTPS.
