# RuralStay con Docker

Proyecto listo para ejecutarse con Docker Compose. No hace falta instalar Node.js
ni MongoDB en el ordenador que lo vaya a probar.

## Requisitos

- Docker Desktop instalado y arrancado.
- Puertos libres: `8080` para el frontend, `3001` para el backend y `27018`
  para MongoDB desde el host.

## Arrancar el proyecto

Desde la carpeta raiz del repositorio, donde esta este `README.md`, ejecuta:

```bash
docker compose up --build
```

Cuando termine de construir, abre:

- Frontend: http://localhost:8080
- Backend: http://localhost:3001
- Health check: http://localhost:3001/api/health

El archivo que se debe usar es el `docker-compose.yml` de la raiz del proyecto.
Ese Compose levanta tres servicios: `mongo`, `backend` y `frontend`.

## Parar el proyecto

```bash
docker compose down
```

Para parar y borrar tambien los datos guardados en MongoDB:

```bash
docker compose down -v
```

## Notas

- El frontend se construye con Vite y se sirve con Nginx en el puerto `8080`.
- Nginx reenvia las peticiones `/api` al backend dentro de la red Docker.
- El backend espera a que MongoDB responda antes de arrancar.
