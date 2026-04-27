Backend simple listo para probar.

Sin Docker:
  npm install
  npm start

Con Docker:
  docker compose up --build

URL:
  http://localhost:3001

Login de prueba:
  POST /api/auth/login
  {
    "email": "test@test.com",
    "password": "123456"
  }
