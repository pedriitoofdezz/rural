# Documentacion del proyecto RuralStay

## 1. Introduccion

RuralStay es una aplicacion web orientada a la consulta y reserva de
alojamientos rurales. El proyecto esta dividido en frontend, backend y base de
datos, y se ha preparado para ejecutarse de forma sencilla con Docker Compose.

El objetivo principal es que cualquier persona pueda clonar el repositorio,
arrancar el proyecto con un unico comando y probar la aplicacion desde el
navegador sin instalar Node.js ni MongoDB en su equipo.

## 2. Tecnologias utilizadas

- React para la interfaz de usuario.
- Vite para el empaquetado y entorno de desarrollo del frontend.
- Express para el backend.
- MongoDB como base de datos.
- Mongoose para la conexion entre backend y MongoDB.
- Nginx para servir el frontend en produccion.
- Docker y Docker Compose para contenerizar todo el proyecto.

## 3. Estructura del proyecto

```text
rural-main/
  docker-compose.yml
  README.md
  DOCUMENTACION.md
  back + yml/
    backend/
      Dockerfile
      package.json
      src/
        app.js
        server.js
        config/
        controllers/
        data/
        models/
        routes/
  frontend-rural/
    Dockerfile
    nginx.conf
    package.json
    index.html
    indice-tfg.md
    public/
    src/
      App.jsx
      App.css
      main.jsx
      index.css
      components/
      mocks/
      pages/
      services/
```

El archivo principal para ejecutar el proyecto es `docker-compose.yml`, situado
en la raiz del repositorio.

## 4. Ejecucion con Docker

Requisitos:

- Docker Desktop instalado.
- Docker Desktop arrancado antes de ejecutar los comandos.
- Puertos libres: `8080`, `3001` y `27018`.

Desde la raiz del proyecto:

```bash
docker compose up --build
```

URLs principales:

- Frontend: http://localhost:8080
- Backend: http://localhost:3001
- Health check: http://localhost:3001/api/health

Para parar el proyecto:

```bash
docker compose down
```

Para parar el proyecto y borrar los datos de MongoDB:

```bash
docker compose down -v
```

## 5. Funcionamiento del frontend

El frontend esta desarrollado con React. La aplicacion usa rutas hash para no
depender de una libreria de rutas externa y para funcionar correctamente servida
por Nginx.

Rutas disponibles:

- `#/`: pagina de inicio.
- `#/alojamientos`: listado de alojamientos.
- `#/alojamiento/:id`: detalle de un alojamiento.
- `#/reserva`: formulario general de reserva.
- `#/reserva/:id`: formulario de reserva para un alojamiento concreto.
- `#/contacto`: pagina de contacto.

Componentes principales:

- `Navbar`: menu superior y acceso a reserva.
- `SearchBar`: formulario de busqueda por destino y huespedes.
- `Footer`: pie de pagina.

Paginas principales:

- `Home.jsx`: pagina de inicio con buscador y alojamientos destacados.
- `Alojamientos.jsx`: listado filtrable de alojamientos.
- `HouseDetail.jsx`: detalle de un alojamiento.
- `Booking.jsx`: formulario de reserva.

## 6. Datos de prueba

Los alojamientos de prueba se encuentran en:

```text
frontend-rural/src/mocks/alojamientos.js
```

Actualmente existen alojamientos en:

- Segovia
- Asturias
- Cantabria

Por este motivo, si se busca un destino que no esta en los datos de prueba,
como `Pirineos`, la aplicacion muestra que no hay resultados.

## 7. Funcionamiento del backend

El backend esta desarrollado con Express y expone rutas bajo `/api`.

Rutas principales:

- `GET /api/health`: comprueba que el backend responde.
- `GET /api/houses`: obtiene alojamientos.
- `GET /api/houses/:id`: obtiene un alojamiento por identificador.
- `GET /api/houses/search`: busca alojamientos.
- `GET /api/bookings`: obtiene reservas.
- `POST /api/bookings`: crea una reserva.

La conexion a MongoDB se configura mediante la variable:

```text
MONGO_URI=mongodb://mongo:27017/rural
```

Dentro de Docker, el backend se conecta al servicio `mongo` usando la red interna
de Docker Compose.

## 8. Docker Compose

El `docker-compose.yml` de la raiz levanta tres servicios:

- `mongo`: base de datos MongoDB.
- `backend`: API Node/Express.
- `frontend`: aplicacion React construida con Vite y servida por Nginx.

MongoDB incluye un `healthcheck`. El backend espera a que MongoDB este sano
antes de arrancar. Esto evita errores de conexion al iniciar el proyecto.

## 9. Errores detectados y correcciones realizadas

### 9.1. Botones sin funcionamiento

Problema:

Varios botones no realizaban ninguna accion real. Algunos enlaces usaban
`href="#"`, el boton "Ver alojamiento" solo mostraba un `alert` y el boton
"Reservar" no llevaba a un flujo completo.

Correccion:

Se implemento navegacion real mediante rutas hash y se conectaron los botones
con las pantallas correspondientes:

- `Ver alojamiento` abre el detalle.
- `Reservar` abre el formulario de reserva.
- `Reservar ahora` abre la seccion de reservas.
- El menu superior navega entre secciones reales.

### 9.2. Ausencia de enrutado completo

Problema:

`App.jsx` cargaba solamente la pagina de inicio. Aunque existian archivos de
paginas, no habia una forma real de acceder a ellas.

Correccion:

Se creo un sistema de rutas hash en `App.jsx`, permitiendo acceder a inicio,
alojamientos, detalle, reserva y contacto.

### 9.3. Busquedas sin resultados

Problema:

Al buscar destinos que no estaban en los datos mock, la aplicacion no mostraba
resultados. Tambien se detecto que al buscar `Segovia` podia no aparecer nada si
el navegador estaba sirviendo un contenedor antiguo.

Correccion:

Se verifico el filtrado por nombre, ubicacion y numero de huespedes. Tambien se
reconstruyo el contenedor correcto desde la raiz del proyecto.

### 9.4. Contenedor antiguo en localhost

Problema:

`localhost:8080` estaba mostrando una version anterior del frontend porque
seguia activo un contenedor creado desde otro `docker-compose.yml`.

Correccion:

Se paro el contenedor antiguo y se levanto el proyecto desde la raiz:

```bash
docker compose up --build -d
```

### 9.5. Docker Compose duplicado

Problema:

Existian archivos `docker-compose.yml` duplicados en subcarpetas, lo que podia
confundir a la hora de ejecutar el proyecto.

Correccion:

Se dejaron los archivos necesarios y se documento que el unico Compose que debe
usarse es el de la raiz del repositorio.

### 9.6. Limpieza de archivos innecesarios

Problema:

La carpeta contenia archivos generados, documentos sueltos y ficheros vacios o
no usados.

Correccion:

Se eliminaron builds, dependencias locales, assets de plantilla, componentes
vacios y Compose duplicados. El repositorio queda con el codigo necesario y la
documentacion principal.

## 10. Validaciones realizadas

Se usaron los siguientes comandos:

```bash
npm run lint
npm run build
docker compose config
docker compose build
```

Tambien se comprobo el endpoint:

```text
http://localhost:3001/api/health
```

Respuesta esperada:

```json
{"ok":true}
```

## 11. Estado final

El proyecto queda preparado para:

- Ejecutarse con Docker Compose desde otro ordenador.
- Consultar alojamientos.
- Buscar por destino y huespedes.
- Ver el detalle de un alojamiento.
- Realizar una reserva desde el frontend.
- Mantener una estructura limpia y documentada.

## 12. Posibles mejoras futuras

- Sustituir los datos mock del frontend por llamadas reales al backend.
- Guardar todas las reservas directamente en MongoDB desde el frontend.
- Ampliar el catalogo de alojamientos.
- Anadir autenticacion completa de usuarios.
- Mejorar la gestion de disponibilidad por fechas.
- Generar una version PDF o DOCX de esta documentacion para entrega formal.
