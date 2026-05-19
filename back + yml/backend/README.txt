Backend simple listo para probar con Docker.
MongoDB guarda alojamientos, reservas y usuarios.
Al arrancar por primera vez se cargan los alojamientos y el usuario de prueba.

Desde la carpeta raiz del proyecto:
  docker compose up --build

URLs:
  Frontend: http://localhost:8080
  Backend: http://localhost:3001

Login de prueba:
  POST /api/auth/login
  {
    "email": "test@test.com",
    "password": "123456"
  }
