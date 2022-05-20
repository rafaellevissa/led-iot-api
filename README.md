# Led IOT

This is a rest API made with `adonis`, the technologies used can be seen down bellow:

| NAME       | VERSION |
| ---------- | ------- |
| adonis     | 5       |
| redis      | 7       |
| mysql      | latest  |
| typescript | 4       |

### Usage

It was created a `Dockerfile` and `docker-compose.yml` so then the project can be up and running easily typing the folowing command:

```
docker-compose up -d --build
```

After that, you can look it running at `http://localhost:3333`.

#### ADMIN USER:

```
email: admin@areopagus.com
password: 123Change@
```

### Tests

Before running the tests is necessary to install the node dependencies

```
npm i
```

Once everything is installed, you can either up the redis container running the folowing code or set it up yourself and change after the `.env.test` file with the credencials of your redis. You do not need to run the other containers because the database is set up to run in memory in test mode.

```
docker-compose up redis
```

Now you only need to run the next command:

```
node ace test
```
