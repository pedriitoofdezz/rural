# Frontend RuralStay con Docker

Este frontend se construye dentro de Docker y se sirve con Nginx.

Desde la raiz del proyecto:

```bash
docker compose up --build
```

URL:

- http://localhost:8080

Las peticiones `/api` se envian desde Nginx al servicio `backend`.
