# Paso de datos mock a MongoDB como base de datos completa

## Situacion inicial

Al principio la aplicacion no usaba MongoDB para todos sus datos. Habia dos fuentes principales:

- En el frontend, el archivo `frontend-rural/src/mocks/alojamientos.js` contenia alojamientos de prueba.
- En el backend, el archivo `back + yml/backend/src/data/data.js` contenia otro array con los alojamientos.

Esto permitia que la aplicacion funcionara para una demo, pero no era una base de datos completa. Los alojamientos estaban escritos directamente en archivos JavaScript y no se podian consultar, actualizar o mantener como documentos reales de una base de datos.

MongoDB ya existia en el proyecto mediante Docker Compose, pero se usaba principalmente para guardar reservas. Los alojamientos y el usuario de login seguian dependiendo de datos fijos en el codigo.

## Objetivo del cambio

El objetivo fue hacer que MongoDB guardara las entidades principales del proyecto:

- Alojamientos.
- Reservas.
- Usuarios.

Con esto, el backend pasa a trabajar con colecciones reales de MongoDB en lugar de depender de arrays en memoria o datos mock como fuente principal.

## Modelo de alojamientos

Se creo el modelo `House` en:

```text
back + yml/backend/src/models/House.js
```

Este modelo define la estructura de cada alojamiento dentro de MongoDB:

- `id`: identificador publico usado por el frontend.
- `title`: nombre del alojamiento.
- `location`: ubicacion.
- `description`: descripcion.
- `pricePerNight`: precio por noche.
- `capacity`: capacidad maxima.
- `images`: imagenes.
- `amenities`: servicios incluidos.

Antes, estos datos estaban en `data.js`. Ahora existen como documentos dentro de la coleccion de alojamientos de MongoDB.

## Modelo de usuarios

Se creo el modelo `User` en:

```text
back + yml/backend/src/models/User.js
```

Este modelo permite que el login deje de depender de credenciales escritas directamente en el controlador.

El usuario contiene:

- `name`.
- `email`.
- `passwordHash`.
- `role`.

Tambien se creo el archivo:

```text
back + yml/backend/src/utils/password.js
```

Ese archivo genera un hash SHA-256 de la contrasena. Asi, MongoDB guarda `passwordHash` y no la contrasena en texto plano.

## Modelo de reservas

El modelo `Booking`, que ya existia, se reforzo en:

```text
back + yml/backend/src/models/Booking.js
```

Antes aceptaba los campos de forma mas abierta. Ahora tiene validaciones basicas:

- `houseId` es obligatorio.
- `alojamientoNombre` es obligatorio.
- `guestName` y `guestEmail` son obligatorios.
- `checkIn` y `checkOut` son obligatorios.
- `guests` debe ser al menos 1.
- `status` solo puede ser `confirmada` o `cancelada`.
- Se usan `timestamps`, por lo que MongoDB guarda `createdAt` y `updatedAt`.

Ademas, al crear una reserva, el backend comprueba que el alojamiento exista en MongoDB y que la reserva no supere la capacidad maxima del alojamiento.

## Seed automatico de datos iniciales

Se creo el archivo:

```text
back + yml/backend/src/config/seed.js
```

Este archivo carga datos iniciales en MongoDB cuando arranca el backend.

El seed usa los datos de:

```text
back + yml/backend/src/data/data.js
```

Pero ahora ese archivo ya no es la fuente principal de consulta de la aplicacion. Solo sirve como datos iniciales para poblar MongoDB.

El seed hace `upsert`, es decir:

- Si el alojamiento o usuario no existe, lo crea.
- Si ya existe, lo actualiza.
- No duplica registros en cada arranque.

Esto permite borrar el volumen de MongoDB y volver a levantar el proyecto sin perder los datos minimos necesarios para probar la aplicacion.

## Conexion con MongoDB

El archivo:

```text
back + yml/backend/src/config/db.js
```

se modifico para ejecutar el seed justo despues de conectar con MongoDB.

El flujo actual es:

1. El backend lee `MONGO_URI`.
2. Se conecta a MongoDB usando Mongoose.
3. Ejecuta `seedDatabase()`.
4. Confirma que los datos iniciales existen.
5. Arranca el servidor Express.

Tambien se cambio:

```text
back + yml/backend/src/server.js
```

para esperar correctamente a que MongoDB este conectado antes de iniciar el servidor.

## Controlador de alojamientos

El archivo:

```text
back + yml/backend/src/controllers/houseController.js
```

antes importaba los alojamientos desde `data.js`.

Ahora importa el modelo `House` y consulta MongoDB directamente.

Antes:

```js
import { houses } from '../data/data.js';
```

Ahora:

```js
import House from '../models/House.js';
```

Los endpoints siguen siendo los mismos:

- `GET /api/houses`
- `GET /api/houses/:id`
- `GET /api/houses/search`

Pero ahora la informacion sale de MongoDB.

## Controlador de reservas

El archivo:

```text
back + yml/backend/src/controllers/bookingController.js
```

se actualizo para relacionar las reservas con alojamientos reales guardados en MongoDB.

Cuando se crea una reserva:

1. Busca el alojamiento por `houseId` en MongoDB.
2. Si no existe, devuelve error.
3. Si el numero de huespedes supera la capacidad, devuelve error.
4. Si todo es correcto, guarda la reserva en MongoDB.

Esto evita guardar reservas de alojamientos inexistentes.

## Controlador de login

El archivo:

```text
back + yml/backend/src/controllers/authController.js
```

antes comparaba directamente:

```js
email === 'test@test.com' && password === '123456'
```

Ahora busca el usuario en MongoDB mediante el modelo `User` y compara el hash de la contrasena introducida con el `passwordHash` guardado.

El login de prueba sigue siendo:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

pero ahora ese usuario vive en MongoDB.

## Papel actual del mock del frontend

El archivo:

```text
frontend-rural/src/mocks/alojamientos.js
```

no se ha eliminado porque sigue siendo util como respaldo durante desarrollo.

El servicio del frontend intenta primero llamar a:

```text
/api/houses
```

Si el backend no responde, entonces usa el mock local para que la interfaz no se rompa.

Por tanto, el mock ya no es la fuente principal de datos. La fuente principal es MongoDB a traves del backend.

## Flujo actual de datos

El flujo queda asi:

```text
Frontend
  |
  | llama a /api/houses, /api/bookings o /api/auth/login
  v
Backend Express
  |
  | usa modelos Mongoose
  v
MongoDB
  |
  | colecciones de houses, bookings y users
  v
Datos persistentes
```

## Resultado final

Despues del cambio, MongoDB refleja las partes principales de la aplicacion:

- Los alojamientos estan guardados como documentos reales.
- Las reservas se guardan en MongoDB y se validan contra alojamientos existentes.
- Los usuarios estan guardados en MongoDB.
- El login consulta la base de datos.
- Los datos iniciales se cargan automaticamente al arrancar.
- El frontend mantiene un mock solo como respaldo si el backend no esta disponible.

Con esto, el proyecto deja de depender de datos fijos como fuente principal y pasa a usar MongoDB como base de datos completa.

