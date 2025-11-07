# Super Movie App 🎬

## ⚙️ Налаштування змінних середовища

Створіть файл `.env` у корені проекту:

```env
REACT_APP_API_URL=API ВАШОГО БЕКЕНДУ
```

## 🐳 Завантаження та запуск Docker образу

docker pull konichivajs/movies:latest

DockerHub - [link](https://hub.docker.com/r/konichivajs/movies)

## Запустити контейнер:

docker run --name movies -p 3000:3000 -e REACT_APP_API_URL=http://localhost:8000/api/v1 konichivajs/movies

Доступ до додатку - http://localhost:3000
