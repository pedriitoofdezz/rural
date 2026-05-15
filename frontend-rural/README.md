# Frontend RuralStay

Este frontend se construye dentro de Docker y se sirve con Nginx.

Para levantar el proyecto completo, usa siempre el `docker-compose.yml` de la
raiz del repositorio:

```bash
docker compose up --build
```

URL del frontend:

- http://localhost:8080

Las peticiones `/api` se envian desde Nginx al servicio `backend` dentro de la
red Docker.
