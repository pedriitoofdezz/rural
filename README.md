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
- El frontend consume `/api/houses` y `/api/bookings`; si el backend no esta
  disponible durante desarrollo, usa los datos mock como respaldo.
- MongoDB guarda alojamientos, reservas y usuarios. Al arrancar por primera vez,
  el backend carga automaticamente los alojamientos y el usuario de prueba.
- El backend espera a que MongoDB responda antes de arrancar.

## Errores y correcciones realizadas

Durante la revision final se detectaron varios problemas de funcionamiento y
despliegue:

- Los botones de navegacion y reserva no realizaban ninguna accion real. Algunos
  enlaces usaban `href="#"` y el boton de ver alojamiento solo mostraba un
  `alert`.
- La aplicacion no tenia enrutado completo: `App.jsx` cargaba solo la pagina de
  inicio, por lo que no se podia acceder correctamente a alojamientos, detalle o
  reserva.
- El buscador podia dar la sensacion de fallar si se buscaban destinos que no
  estaban en los datos de prueba, como `Pirineos`. Actualmente los datos mock
  incluyen alojamientos en `Segovia`, `Asturias` y `Cantabria`.
- Al probar `Segovia` desde `localhost:8080`, el navegador estaba mostrando un
  contenedor antiguo creado desde otro `docker-compose.yml`, no la version
  actual del proyecto.
- La documentacion de Docker no dejaba suficientemente claro que se debe usar el
  `docker-compose.yml` de la raiz del repositorio.

Correcciones aplicadas:

- Se implemento navegacion por rutas hash: `#/`, `#/alojamientos`,
  `#/alojamiento/:id`, `#/reserva/:id` y `#/contacto`.
- Los botones `Reservar`, `Reservar ahora`, `Ver alojamiento` y los enlaces del
  menu pasaron a navegar a pantallas reales.
- Se creo una pantalla de detalle de alojamiento y un formulario de reserva con
  validaciones basicas.
- El buscador redirige a la pagina de alojamientos y filtra por nombre,
  ubicacion y numero de huespedes.
- Se paro el contenedor antiguo del frontend y se levanto el proyecto completo
  desde la raiz con `docker compose up --build -d`.
- Se mejoro Docker Compose con `healthcheck` para MongoDB y espera del backend
  hasta que la base de datos este disponible.
- Se conecto el frontend con el backend real mediante `/api`, manteniendo un
  fallback local para poder seguir probando la interfaz aunque el backend no
  responda.
- Se alinearon los datos del backend con los alojamientos del frontend y se
  corrigio la busqueda por nombre o ubicacion.
- Se verifico el frontend con `npm run lint`, `npm run build`, `docker compose
  config` y ejecucion del entorno Docker.
