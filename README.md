link a la imagen de dockerhub: https://hub.docker.com/repository/docker/romancastro/finalbackend/general


# Proyecto Backend Adoptme

## Descripción
API REST para manejo de adopciones, usuarios y mascotas usando Express y MongoDB.

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. El archivo `.env` viene incluido en el repositorio
4. Ejecutar `npm start` para iniciar el servidor.

## Endpoints principales
- `/api/users`: CRUD de usuarios
- `/api/pets`: CRUD de mascotas
- `/api/adoptions`: CRUD de adopciones
- `/api/sessions`: manejo de sesiones / login
- `/api/users/mock/:count`: para generar usuarios mock
- Otros endpoints según el código.

## Docker
Para construir la imagen:  
```bash
docker build -t romancastro/finalbackend:latest .
```

Para ejecutar el contenedor:  
```bash
docker run -d -p 8080:8080 --name finalbackend romancastro/finalbackend:latest
```

## Notas
- Asegurarse que MongoDB esté corriendo y la URL en `.env` sea correcta.
- Para pruebas se usan mocha y supertest (aunque no fueron completados).

---
© Roman Castro
