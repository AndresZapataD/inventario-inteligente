# 📋 Guía Completa de Despliegue - Sistema de Inventario Inteligente

Sigue estos pasos exactamente para tener el proyecto corriendo en tu PC.

---

## 🔧 PARTE 1: INSTALACIÓN DE PROGRAMAS NECESARIOS

### Paso 1.1: Instalar Node.js
1. Ve a [https://nodejs.org/](https://nodejs.org/)
2. Descarga la versión **LTS** (Long Term Support) - versión estable
3. Ejecuta el instalador y sigue los pasos por defecto
4. Abre PowerShell/Símbolo del sistema y verifica:
```bash
node --version
npm --version
```
Debería mostrarte versiones (ej: v20.11.0)

### Paso 1.2: Instalar PostgreSQL
1. Ve a [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)
2. Descarga **PostgreSQL 15 o 16** (versión estable)
3. Ejecuta el instalador:
   - ✅ Marca todas las opciones (incluye pgAdmin)
   - 📝 **IMPORTANTE**: Anota la contraseña del usuario `postgres` (la necesitarás después)
   - Puerto por defecto: **5432** ✓
   - Encoding: **UTF-8** ✓
4. Cuando termine, pgAdmin se abrirá automáticamente

---

## 🗄️ PARTE 2: CREAR LA BASE DE DATOS

### Paso 2.1: Acceder a pgAdmin
1. pgAdmin debería estar abierto (si no: abre el navegador e ingresa `http://localhost:5050`)
2. Si te pide contraseña, usa la que estableciste en la instalación de PostgreSQL
3. En la barra izquierda, expande **Servers** → **PostgreSQL [versión]**
4. Se pedirá la contraseña del usuario `postgres`, ingrésala

### Paso 2.2: Crear una nueva base de datos
1. Haz clic derecho en **Databases** → **Create** → **Database**
2. En la ventana que aparece:
   - **Database name**: escribe `inventario_db`
   - Deja todo lo demás por defecto
3. Click en **Save**
4. ✅ Listo! La BD está creada

### Paso 2.3: Verificar la conexión (Opcional pero recomendado)
En pgAdmin, expande:
- Servers → PostgreSQL → Databases → inventario_db

Deberías ver la BD listada.

---

## 📂 PARTE 3: PREPARAR EL PROYECTO

### Paso 3.1: Abrir el proyecto en VS Code
1. Abre VS Code
2. File → Open Folder → Selecciona la carpeta `inventario-inteligente`
3. ✅ Todo el proyecto se cargará

### Paso 3.2: Crear archivo de configuración (.env)
El backend necesita saber cómo conectarse a PostgreSQL. Crearemos un archivo `.env`:

1. Ve a la carpeta **backend** en VS Code
2. Haz clic derecho → **New File** → Nombra el archivo: `.env`
3. Copia y pega esto exactamente:

```
# CONFIGURACIÓN BASE DE DATOS
DB_NAME=inventario_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432

# CONFIGURACIÓN SERVIDOR
PORT=3000
```

**⚠️ IMPORTANTE:** 
- Si en la instalación de PostgreSQL pusiste una **contraseña diferente a "postgres"**, cambia la línea `DB_PASSWORD=postgres` con tu contraseña real
- Si cambiaste el puerto de PostgreSQL, actualiza también `DB_PORT`

4. Guarda el archivo (Ctrl + S)

---

## 📦 PARTE 4: INSTALAR DEPENDENCIAS

### Paso 4.1: Instalar dependencias del Backend
1. Abre una terminal en VS Code: **Ctrl + ~** (tecla al lado del 1)
2. Navega a la carpeta backend (si no estás ahí ya):
```bash
cd backend
```
3. Instala las dependencias:
```bash
npm install
```
Espera a que termine (verás una carpeta `node_modules` crearse)

### Paso 4.2: Instalar dependencias del Frontend
1. En la MISMA terminal, navega a frontend:
```bash
cd ../frontend
```
2. Instala las dependencias:
```bash
npm install
```
Espera a que termine

---

## 🚀 PARTE 5: EJECUTAR EL PROYECTO

### Opción A: Ejecutar TODO en una sola terminal (Recomendado para principiantes)

**Paso 1:** En VS Code, abre 2 terminales:
- Terminal 1: Ctrl + ~
- Terminal 2: Ctrl + Shift + ~

**Paso 2:** En la **Terminal 1**, ejecuta el backend:
```bash
cd backend
npm run dev
```

Deberías ver:
```
Base de datos conectada
Base de datos sincronizada
Servidor corriendo en puerto 3000
```

**Paso 3:** En la **Terminal 2**, ejecuta el frontend:
```bash
cd frontend
npm run dev
```

Deberías ver:
```
  VITE v8.0.12  ready in 100 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Paso 4:** Abre tu navegador en: `http://localhost:5173`

✅ **¡Listo! El proyecto está corriendo**

---

### Opción B: Ejecutar con un script automático (Para expertos)

Crea un archivo `run.ps1` en la raíz del proyecto:

```powershell
# Script para ejecutar todo automáticamente
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$(Get-Location)\backend' && npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$(Get-Location)\frontend' && npm run dev"
Write-Host "Backend y Frontend iniciados en terminales separadas"
```

Luego ejecuta:
```bash
.\run.ps1
```

---

## 🔍 PARTE 6: VERIFICAR QUE TODO FUNCIONE

### Checklist de verificación:

✓ **Backend corriendo:**
- Terminal muestra: `Servidor corriendo en puerto 3000`
- Sin errores de conexión a BD

✓ **Frontend corriendo:**
- Navegador abre sin errores
- URL: `http://localhost:5173`

✓ **Base de datos funciona:**
- En pgAdmin, puedes expandir `inventario_db`
- Al ejecutar el backend, se crean automáticamente las tablas:
  - `roles`
  - `usuarios`
  - `categorias`
  - `productos`
  - `ventas`
  - `detalle_ventas`
  - `facturas`

### Verificar tablas creadas (Opcional):
1. Abre pgAdmin
2. Navega a: Databases → inventario_db → Schemas → public → Tables
3. Deberías ver todas las tablas listadas

---

## ❌ SOLUCIÓN DE PROBLEMAS

### Problema: "Error: connect ECONNREFUSED"
**Solución:** PostgreSQL no está corriendo
```bash
# En Windows, reinicia el servicio PostgreSQL desde Services
# O ejecuta en CMD como Administrador:
net start postgresql-x64-15
```

### Problema: "ERROR: database "inventario_db" does not exist"
**Solución:** Vuelve a la Parte 2 y crea la base de datos en pgAdmin

### Problema: "FATAL: password authentication failed"
**Solución:** La contraseña en `.env` es incorrecta
- Revisa tu archivo `.env` en la carpeta `backend`
- Debe coincidir con la contraseña que pusiste en PostgreSQL

### Problema: Puerto 3000 o 5173 ya está en uso
**Solución:** Cambia los puertos
- Para backend: En `.env` cambia `PORT=3000` a `PORT=4000`
- Para frontend: En `frontend/vite.config.js` busca y cambia el puerto

### Problema: "npm: command not found"
**Solución:** Node.js no está instalado correctamente
```bash
node --version
npm --version
```
Si no funciona, reinstala Node.js desde [nodejs.org](https://nodejs.org)

---

## 📝 RESUMEN DE COMANDOS ÚTILES

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con auto-recarga)
npm run dev

# Compilar para producción
npm run build

# Ver logs de PostgreSQL
# Windows: Services → PostgreSQL → Log file
```

---

## 🎯 PRÓXIMAS ACCIONES

Una vez que todo esté corriendo:

1. **Crear un usuario de prueba** via API o frontend
2. **Agregar roles** (Admin, Usuario, etc.)
3. **Crear categorías** de productos
4. **Cargar productos** a la base de datos
5. **Prueba de ventas** completa

---

## 📞 NOTAS IMPORTANTES

- **No cierres las terminales** donde ejecutas `npm run dev` - ¡el servidor se detiene!
- **No pierdas la contraseña de PostgreSQL** - la necesitarás después
- **Backup regular** de tu base de datos (especialmente con datos reales)
- El archivo `.env` **NO debe ser compartido** si subes a GitHub (añade a `.gitignore`)

---

**¡Ahora sí, todo debería funcionar! 🎉**

Cualquier pregunta, revisa los logs en la terminal. Los errores suelen ser muy descriptivos.
