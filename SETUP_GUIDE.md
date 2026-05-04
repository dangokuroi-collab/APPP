# Guía de Configuración del Proyecto

Este documento proporciona las instrucciones necesarias para ejecutar el sistema completo, que incluye la aplicación móvil, el backend y la base de datos PostgreSQL.

## Prerrequisitos

- Node.js (v16 o superior)
- Docker y Docker Compose
- Expo CLI (`npm install -g expo-cli`)

## 1. Configuración de la Base de Datos

El sistema utiliza PostgreSQL. Hemos proporcionado un archivo `docker-compose.yml` para facilitar su ejecución.

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Inicia el contenedor de la base de datos:
   ```bash
   docker compose up -d
   ```

## 2. Configuración del Backend

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta las migraciones de Prisma para crear las tablas en la base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run start
   ```
   *Nota: El servidor se ejecutará en el puerto 3000 por defecto.*

## 3. Configuración de la Aplicación Móvil

1. Regresa a la raíz del proyecto:
   ```bash
   cd ..
   ```
2. Instala las dependencias:
   ```bash
   npm install --force
   ```
3. Inicia Expo:
   ```bash
   npm run start
   ```

---

## Casos de Falla Potenciales y Soluciones

### 1. Error de conexión a la base de datos (PostgreSQL)
- **Causa:** El contenedor de Docker no está en ejecución o el puerto 5432 está ocupado.
- **Solución:** Verifica con `docker ps` si el contenedor está activo. Si el puerto está ocupado, detén el servicio local de PostgreSQL o cambia el puerto en `docker-compose.yml` y `.env`.

### 2. Error "Network Error" en la aplicación móvil
- **Causa:** La aplicación móvil intenta conectar a `localhost`, pero en un dispositivo físico o emulador Android, `localhost` se refiere al dispositivo mismo, no a tu computadora.
- **Solución:** Cambia `API_URL` en `services/api.ts` por la dirección IP local de tu computadora (ej. `http://192.168.1.50:3000/api`).

### 3. Fallas en la instalación de dependencias (@tensorflow)
- **Causa:** Conflictos de versiones entre TensorFlow y React 18.
- **Solución:** Utiliza el flag `--force` al instalar dependencias: `npm install --force`.

### 4. JWT Secret no configurado
- **Causa:** Falta el archivo `.env` en la carpeta `backend`.
- **Solución:** Asegúrate de que el archivo `backend/.env` exista y contenga una clave `JWT_SECRET`.

---

## Roles de Usuario

Para probar las funcionalidades de Admin y Repartidor, debes registrar un usuario y cambiar su rol directamente en la base de datos o mediante el endpoint de registro (pasando el campo `role` como `ADMIN` o `DELIVERY`).

- **ADMIN:** Acceso al Panel de Administración (Gestión de productos y pedidos).
- **DELIVERY:** Acceso al apartado de Repartidores (Gestión de entregas).
- **CUSTOMER:** Usuario estándar (Tienda y Carrito).
