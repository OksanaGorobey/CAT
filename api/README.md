# CAT API v0.1

## Оновлення пакетів для Node.js
```
export NODE_PATH=/usr/lib/node_modules:/usr/local/lib/node_modules:/usr/share/javascript
npm i -g npm pm2 body-parser compression express redis lodash sequelize pg ajv ajv-errors ajv-keywords ioredis
npm install -g --unsafe-perm bcrypt
```

## Запуск API через PM2 (dev)
```
NODE_PATH=/usr/lib/node_modules:/usr/local/lib/node_modules:/usr/share/javascript \ 
ENVIRONMENT=dev \
NODE_ENV_PORT=18000 \
DB_HOST=127.0.0.1 \
DB_PORT=5432 \
DB_USER=cat_api \
DB_PASSWORD=ct3zoXhzoCb9e1XbUhH5U2lfWIPKgQcw0SyiqShlBuNYCaiWwVin5kGQJgUmd5Ci \
DB_NAME=cat \
pm2 start --name cat_api_dev /var/www/dev/cat/api/index.js -i 0
```

## Приклади

### /user/register
```  
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -d '{"name":"Роман","email":"roman.telychko@gmail.com","passwd":"1234567812345678"}' \
    https://dev.cat.int10h.net/user/register | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 1,
    "data": {
      "id": "abe6312d-dc66-4a3f-9d1d-82488659ebe5",
      "email": "roman.telychko@gmail.com"
    }
  }
}
```

### /user/authorize
```  
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -d '{"email":"roman.telychko@gmail.com","passwd":"1234567812345678"}' \
    https://dev.cat.int10h.net/user/authorize | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 1,
    "data": {
      "id": "abe6312d-dc66-4a3f-9d1d-82488659ebe5",
      "email": "roman.telychko@gmail.com",
      "token": "6a8eca634d13fc7e5e54ea4b6859a0e4e6a7a92b8a83b0edc7982d2cc8a20cf3dcd4d330213364c4f3b0542f5b5c76fecb1b337459d5ab90d52a93ad546bcdd5"
    }
  }
}
```

### GET /tasks
```  
curl -X GET -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -H 'x-token: 6a8eca634d13fc7e5e54ea4b6859a0e4e6a7a92b8a83b0edc7982d2cc8a20cf3dcd4d330213364c4f3b0542f5b5c76fecb1b337459d5ab90d52a93ad546bcdd5' \
    "https://dev.cat.int10h.net/tasks?limit=100&offset=0" | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 2,
    "data": [
      {
        "id": "e1457114-4cbe-45cc-93d7-937be651d3a8",
        "title": "Нове завдання",
        "status": 1
      },
      {
        "id": "46a2bb44-92cb-436c-b979-ed685e6cabf7",
        "title": "Завдання №2",
        "status": 1
      }
    ]
  }
}
```

### GET /task/:id
```  
curl -X GET -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -H 'x-token: 6a8eca634d13fc7e5e54ea4b6859a0e4e6a7a92b8a83b0edc7982d2cc8a20cf3dcd4d330213364c4f3b0542f5b5c76fecb1b337459d5ab90d52a93ad546bcdd5' \
    https://dev.cat.int10h.net/task/e1457114-4cbe-45cc-93d7-937be651d3a8 | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 1,
    "data": {
      "id": "e1457114-4cbe-45cc-93d7-937be651d3a8",
      "user_id": "9307e51e-6a38-428e-bd9a-fbcf6042fc68",
      "title": "Нове завдання",
      "status": 1,
      "created_date": "2020-04-05T09:44:21.830Z",
      "updated_date": "2020-04-05T09:44:21.830Z",
      "deleted_date": null
    }
  }
}
```

### POST /task
```  
curl -X POST -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -H 'x-token: 6a8eca634d13fc7e5e54ea4b6859a0e4e6a7a92b8a83b0edc7982d2cc8a20cf3dcd4d330213364c4f3b0542f5b5c76fecb1b337459d5ab90d52a93ad546bcdd5' \
    -d '{"title":"Нове завдання"}' \
    https://dev.cat.int10h.net/task | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 1,
    "data": {
      "id": "e357e2a0-2382-4205-b157-19efdcea52b6"
    }
  }
}
```

### PUT /task/:id
```  
curl -X PUT -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -H 'x-token: 6a8eca634d13fc7e5e54ea4b6859a0e4e6a7a92b8a83b0edc7982d2cc8a20cf3dcd4d330213364c4f3b0542f5b5c76fecb1b337459d5ab90d52a93ad546bcdd5' \
    -d '{"title":"Оновлення завдання","status":2}' \
    https://dev.cat.int10h.net/task/e357e2a0-2382-4205-b157-19efdcea52b6 | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 1,
    "data": {
      "id": "e357e2a0-2382-4205-b157-19efdcea52b6",
      "user_id": "9307e51e-6a38-428e-bd9a-fbcf6042fc68"
    }
  }
}
```

### DELETE /task/:id
```  
curl -X DELETE -H 'Content-Type: application/json; charset=utf-8' -k -s \
    -H 'x-token: 6a8eca634d13fc7e5e54ea4b6859a0e4e6a7a92b8a83b0edc7982d2cc8a20cf3dcd4d330213364c4f3b0542f5b5c76fecb1b337459d5ab90d52a93ad546bcdd5' \
    https://dev.cat.int10h.net/task/e357e2a0-2382-4205-b157-19efdcea52b6 | jq
```
Відповідь (success):
```
{
  "content": {
    "count": 1,
    "data": {
      "id": "e357e2a0-2382-4205-b157-19efdcea52b6",
      "user_id": "9307e51e-6a38-428e-bd9a-fbcf6042fc68"
    }
  }
}
```