# Guía de despliegue — Sistema de Inventario Inteligente

Esta guía explica paso a paso cómo instalar, configurar y ejecutar el proyecto en tu computador.

---

# 1. Instalación de programas necesarios

## 1.1 Instalar Node.js

1. Ingresa a:

https://nodejs.org

2. Descarga la versión LTS (Long Term Support).

3. Ejecuta el instalador y deja las opciones por defecto.

4. Cuando termine, abre PowerShell o CMD y verifica la instalación:

```bash
node --version
npm --version
```

Si todo salió bien, aparecerán las versiones instaladas.

---

## 1.2 Instalar PostgreSQL

1. Ingresa a:

https://www.postgresql.org/download/windows/

2. Descarga PostgreSQL 15 o 16.

3. Durante la instalación:

- Deja seleccionado pgAdmin.
- Usa el puerto por defecto: `5432`.
- Mantén UTF-8 como encoding.
- Guarda la contraseña del usuario `postgres`, porque será necesaria después.

4. Finaliza la instalación.

---

# 2. Crear la base de datos

## 2.1 Abrir pgAdmin

1. Abre pgAdmin.
2. En el panel izquierdo expande:

```text
Servers → PostgreSQL
```

3. Ingresa la contraseña del usuario `postgres`.

---

## 2.2 Crear la base de datos

1. Haz clic derecho sobre `Databases`.
2. Selecciona:

```text
Create → Database
```

3. En “Database name” escribe:

```text
inventario_db
```

4. Guarda los cambios.

La base de datos ya quedó creada.

---

# 3. Preparar el proyecto

## 3.1 Abrir el proyecto en VS Code

1. Abre Visual Studio Code.
2. Ve a:

```text
File → Open Folder
```

3. Selecciona la carpeta del proyecto `inventario-inteligente`.

---

## 3.2 Crear el archivo `.env`

Dentro de la carpeta `backend` crea un archivo llamado:

```text
.env
```

Agrega lo siguiente:

```env
DB_NAME=inventario_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432

PORT=3000
```

Si tu contraseña de PostgreSQL no es `postgres`, reemplázala por la correcta.

Guarda el archivo.

---

# 4. Instalar dependencias

## 4.1 Backend

Abre una terminal en VS Code:

```bash
Ctrl + ñ
```

Luego ejecuta:

```bash
cd backend
npm install
```

Espera a que termine la instalación.

---

## 4.2 Frontend

En la misma terminal ejecuta:

```bash
cd ../frontend
npm install
```

---

# 5. Ejecutar el proyecto

## 5.1 Ejecutar el backend

Abre una terminal nueva y ejecuta:

```bash
cd backend
npm run dev
```

Si todo funciona correctamente, aparecerá algo parecido a:

```text
Base de datos conectada
Base de datos sincronizada
Servidor corriendo en puerto 3000
```

---

## 5.2 Ejecutar el frontend

En otra terminal ejecuta:

```bash
cd frontend
npm run dev
```

Deberías ver algo similar a:

```text
VITE ready

Local: http://localhost:5173
```

---

## 5.3 Abrir el sistema

En el navegador abre:

```text
http://localhost:5173
```

---

# 6. Verificar que todo funcione

## Backend

Verifica que:

- No aparezcan errores en la terminal.
- El servidor indique que está corriendo.
- La conexión con PostgreSQL sea exitosa.

---

## Frontend

Verifica que:

- La página cargue correctamente.
- No aparezcan errores en consola.

---

## Base de datos

En pgAdmin revisa:

```text
Databases → inventario_db → Schemas → public → Tables
```

Las tablas deberían haberse creado automáticamente.

---

# 7. Solución de problemas

## Error de conexión a PostgreSQL

Si aparece:

```text
ECONNREFUSED
```

Significa que PostgreSQL no está iniciado.

Puedes reiniciar el servicio desde Windows:

```text
Services → PostgreSQL
```

o ejecutar:

```bash
net start postgresql-x64-15
```

---

## Error: database does not exist

Si aparece:

```text
database "inventario_db" does not exist
```

Debes crear la base de datos en pgAdmin.

---

## Error de contraseña

Si aparece:

```text
password authentication failed
```

La contraseña del archivo `.env` no coincide con la de PostgreSQL.

---

## Puerto ocupado

Si el puerto 3000 o 5173 ya está siendo usado:

- Cambia `PORT=3000` en `.env`.
- Cambia el puerto del frontend en `vite.config.js`.

---

## npm no reconocido

Si aparece:

```text
npm: command not found
```

Node.js no quedó instalado correctamente.

Verifica:

```bash
node --version
npm --version
```

---

# 8. Comandos útiles

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Compilar proyecto:

```bash
npm run build
```

---

# 9. Recomendaciones

- No cierres las terminales donde ejecutas `npm run dev`.
- Mantén respaldos de la base de datos.
- El archivo `.env` no debe subirse a GitHub.
- Agrega `.env` al `.gitignore`.

---

# 10. Próximos pasos

Cuando el sistema esté funcionando puedes continuar con:

- Creación de usuarios.
- Gestión de roles.
- Registro de categorías.
- Carga de productos.
- Implementación de ventas y facturación.