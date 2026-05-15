# Indice del TFG

1. Introduccion
   1.1. Contexto del proyecto
   1.2. Motivacion
   1.3. Alcance del trabajo
2. Objetivos del proyecto
   2.1. Objetivo general
   2.2. Objetivos especificos
3. Metodologia de desarrollo
   3.1. Enfoque de trabajo
   3.2. Herramientas empleadas
   3.3. Fases del desarrollo
4. Preparacion del entorno de trabajo
   4.1. Instalacion y uso de Docker
   4.2. Creacion de la imagen del proyecto
   4.3. Ejecucion del contenedor
   4.4. Problemas iniciales de configuracion
5. Creacion del proyecto frontend
   5.1. Inicializacion con Vite
   5.2. Seleccion de React como libreria principal
   5.3. Uso de JavaScript en el desarrollo
   5.4. Importancia de Node.js en el proyecto
6. Estructura y organizacion de la aplicacion
   6.1. Estructura de carpetas
   6.2. Archivo `public`
   6.3. Carpeta `src`
   6.4. Archivos principales de configuracion
   6.5. Separacion de responsabilidades
7. Arquitectura de la aplicacion
   7.1. Flujo de carga de la aplicacion
   7.2. Relacion entre `main.jsx`, `App.jsx` y las paginas
   7.3. Uso de componentes reutilizables
   7.4. Gestion de datos de las casas rurales
8. Desarrollo funcional de la aplicacion
   8.1. Visualizacion de casas rurales
   8.2. Pagina de detalle del alojamiento
   8.3. Proceso de reserva
   8.4. Comunicacion con el backend
9. Diseno de la interfaz de usuario
   9.1. Objetivos de usabilidad
   9.2. Diseno de la pagina de inicio
   9.3. Experiencia de usuario orientada a la reserva
   9.4. Elementos visuales de confianza y orientacion
10. Desarrollo de componentes
   10.1. Componente `Navbar`
   10.2. Componente `SearchBar`
   10.3. Componente `Footer`
   10.4. Paginas principales de la aplicacion
11. Implementacion de estilos
   11.1. Importacion de hojas de estilo
   11.2. Aplicacion de estilos en React
   11.3. Uso de `className` en componentes
12. Incidencias durante el desarrollo
   12.1. Error por ausencia de proyecto Node
   12.2. Problemas con la ejecucion en localhost
   12.3. Repeticion de lineas y errores derivados
   12.4. Botones y enlaces sin funcionamiento real
   12.5. Busqueda sin resultados y datos de prueba
   12.6. Contenedores Docker antiguos y Compose incorrecto
   12.7. Correcciones aplicadas y validacion final
13. Pruebas y validacion
   13.1. Ejecucion del proyecto en entorno local
   13.2. Comprobacion del funcionamiento de la interfaz
   13.3. Validacion de la estructura de navegacion
   13.4. Validacion del despliegue con Docker Compose
14. Resultados obtenidos
   14.1. Estado final de la aplicacion
   14.2. Funcionalidades implementadas
   14.3. Valor aportado por la solucion
15. Conclusiones
   15.1. Valoracion del desarrollo realizado
   15.2. Dificultades encontradas
   15.3. Posibles mejoras futuras
16. Bibliografia y recursos consultados
17. Anexos
   17.1. Capturas del desarrollo
   17.2. Comandos utilizados en la terminal
   17.3. Fragmentos de codigo relevantes

## 12. Incidencias durante el desarrollo

Durante el desarrollo y la revision final del proyecto se detectaron varios
errores que afectaban al funcionamiento de la aplicacion y a su despliegue con
Docker. A continuacion se describen los problemas encontrados y las soluciones
aplicadas.

### 12.1. Error por ausencia de proyecto Node

En las primeras pruebas fue necesario comprobar que el frontend tuviera una
estructura valida de proyecto Node/Vite, con sus archivos `package.json`,
`package-lock.json`, `index.html`, `src` y configuracion de Vite. Sin estos
archivos, Docker no podia instalar dependencias ni construir la aplicacion.

La solucion consistio en mantener el frontend como proyecto Vite completo y
verificar la instalacion con `npm install`, `npm run lint` y `npm run build`.

### 12.2. Problemas con la ejecucion en localhost

Se detecto que al abrir `localhost:8080` se estaba mostrando una version antigua
del frontend. El problema no estaba en el codigo nuevo, sino en que seguia
ejecutandose un contenedor anterior llamado `frontend-rural-frontend-1`, creado
desde un `docker-compose.yml` distinto.

La correccion fue parar ese contenedor antiguo y levantar el proyecto desde el
`docker-compose.yml` de la raiz:

```bash
docker compose up --build -d
```

Despues de reconstruir, quedaron activos los servicios correctos:
`rural-main-frontend-1`, `rural-main-backend-1` y `rural-main-mongo-1`.

### 12.3. Repeticion de lineas y errores derivados

Al reorganizar componentes y estilos se reviso que no quedaran elementos
duplicados o restos de la plantilla inicial. Se limpiaron estilos base y se
centralizo la navegacion desde `App.jsx`, evitando pantallas inaccesibles o
componentes sin uso real.

### 12.4. Botones y enlaces sin funcionamiento real

Uno de los errores principales era que varios botones no realizaban acciones
utiles. Algunos enlaces del menu usaban `href="#"`, el boton "Ver alojamiento"
solo mostraba un `alert`, y los botones de reserva no llevaban a ningun proceso
real.

La solucion fue implementar una navegacion por rutas hash:

- `#/` para la pagina de inicio.
- `#/alojamientos` para el listado completo.
- `#/alojamiento/:id` para el detalle de cada alojamiento.
- `#/reserva/:id` para reservar un alojamiento concreto.
- `#/contacto` para la pagina de contacto.

Con esto, los botones "Reservar", "Reservar ahora" y "Ver alojamiento" pasaron
a navegar a pantallas reales.

### 12.5. Busqueda sin resultados y datos de prueba

Tambien se reviso el comportamiento del buscador. Al buscar destinos como
`Pirineos` no aparecian resultados porque los datos de prueba no contenian
ningun alojamiento en esa ubicacion. Los alojamientos mock disponibles estan en
`Segovia`, `Asturias` y `Cantabria`.

Ademas, se comprobo un caso concreto con `Segovia`: aunque existia un
alojamiento con esa ubicacion, el navegador no mostraba resultados porque estaba
cargando una imagen antigua del frontend desde Docker. Tras reconstruir el
contenedor correcto, la busqueda de `Segovia` muestra "Casa Rural El Roble".

La busqueda actual filtra por nombre, ubicacion y numero de huespedes.

### 12.6. Contenedores Docker antiguos y Compose incorrecto

El proyecto tenia mas de un archivo relacionado con Docker, por lo que podia
haber confusion sobre cual ejecutar. Para que cualquier persona pueda probar el
proyecto desde otro ordenador, se dejo documentado que el comando correcto debe
ejecutarse desde la raiz del repositorio:

```bash
docker compose up --build
```

Tambien se mejoro el `docker-compose.yml` principal para levantar tres servicios:
`mongo`, `backend` y `frontend`. MongoDB incluye un `healthcheck`, y el backend
espera a que la base de datos este disponible antes de arrancar.

### 12.7. Correcciones aplicadas y validacion final

Las principales correcciones aplicadas fueron:

- Implementacion de navegacion real entre paginas.
- Creacion de pagina de detalle del alojamiento.
- Creacion de formulario de reserva con validaciones basicas.
- Guardado de reservas en `localStorage` para simular la confirmacion.
- Correccion de enlaces del menu y botones de accion.
- Mejora del buscador y filtrado de alojamientos.
- Actualizacion de Docker Compose y documentacion de despliegue.
- Reconstruccion del entorno Docker correcto.

La validacion final se realizo con los siguientes comandos:

```bash
npm run lint
npm run build
docker compose config
docker compose up --build -d
```

Tambien se comprobo el estado del backend mediante:

```bash
http://localhost:3001/api/health
```

El resultado esperado es:

```json
{"ok":true}
```
