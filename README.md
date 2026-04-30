# RuralStay con Docker

Este proyecto se ejecuta con Docker Compose, sin instalar dependencias de Node ni MongoDB en local.

## Arrancar

Desde esta carpeta:

```bash
docker compose up --build
```

## URLs

- Frontend: http://localhost:8080
- Backend: http://localhost:3001
- Health check: http://localhost:3001/api/health

El frontend sirve la aplicacion con Nginx y reenvia las peticiones `/api` al backend dentro de la red Docker.

## Parar

```bash
docker compose down
```

Para borrar tambien la base de datos creada por Docker:

```bash
docker compose down -v
```
