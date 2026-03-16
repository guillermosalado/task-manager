<h1 align="center">Task Manager</h1>

<p align="center">Gestor de tareas personal con tablero estilo Kanban.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-0db7ed?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

---

## Descripción

**Task Manager** es una aplicación web para organizar tareas de forma visual en un tablero estilo Kanban. Diseñada para la gestión personal del trabajo diario, permite crear, priorizar y dar seguimiento a tareas con diferentes estados y fechas límite.

---

## Vista previa

<p align="center">
  <table>
    <tr>
      <td><img src="docs/home.png" alt="Pantalla principal" width="100%"/></td>
      <td><img src="docs/task.png" alt="Gestor de tareas" width="100%"/></td>
    </tr>
    <tr>
      <td align="center">Pantalla principal</td>
      <td align="center">Gestor de tareas</td>
    </tr>
  </table>
</p>

---

## Funcionalidades

- Tablero Kanban para visualizar el estado de las tareas
- Creación de tareas con título, descripción, prioridad y fecha límite
- Prioridades: urgente, normal y baja
- Estados: pendiente y completada
- Autenticación de usuarios con sesiones

---

## Tecnologías

### Frontend
<p>
  <img src="https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img src="https://img.shields.io/badge/Bootstrap%204.6-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white"/>
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Node.js%2024-%23339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MariaDB%2010.4-%23003545.svg?style=for-the-badge&logo=mariadb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

---

## Arquitectura

La aplicación sigue una arquitectura backend basada en separación de responsabilidades:

```
routes/     →  manejan las solicitudes HTTP entrantes
models/     →  acceso y consultas a la base de datos
config/     →  configuración de conexión y variables de entorno
public/     →  interfaz web (HTML, CSS, JS)
```

Las rutas de tareas están protegidas mediante un middleware de autenticación basado en sesiones — solo usuarios con sesión activa pueden acceder a sus datos.

---

## API

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/login` | Página de inicio de sesión |
| `POST` | `/login` | Iniciar sesión |
| `GET` | `/registro` | Página de registro |
| `POST` | `/registro` | Registrar nuevo usuario |
| `GET` | `/logout` | Cerrar sesión |
| `GET` | `/session` | Consultar estado de sesión activa |

**POST /login y POST /registro — Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "minimo6caracteres"
}
```

**GET /session — Respuesta:**
```json
{ "logged": true, "email": "usuario@ejemplo.com" }
```

### Tareas

> Todas las rutas de tareas requieren sesión activa. Sin sesión, redirigen a `/login`.

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/tasks` | Obtener todas las tareas del usuario |
| `POST` | `/tasks` | Crear una nueva tarea |
| `PUT` | `/tasks/:id` | Actualizar una tarea existente |
| `PUT` | `/tasks/:id/complete` | Marcar tarea como completada |
| `DELETE` | `/tasks/:id` | Eliminar una tarea |

**POST /tasks — Body:**
```json
{
  "title": "Nombre de la tarea",
  "description": "Descripción opcional",
  "priority": "urgente | normal | baja",
  "due_date": "2025-12-31"
}
```

**PUT /tasks/:id — Body:**
```json
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "priority": "normal",
  "due_date": "2025-12-31"
}
```

---

## Ejecutar con Docker

1. Clona el repositorio y configura las variables de entorno:
```bash
git clone https://github.com/guillermosalado/task-manager.git
cd task-manager
cp .env.example .env
```

Edita el `.env` con tus credenciales:
```env
DB_HOST=db
DB_NAME=task_manager
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_ROOT_PASSWORD=tu_root_password
```

2. Levanta los contenedores:
```bash
docker compose up --build
```

3. Abre tu navegador en `http://localhost:3000`

> El schema se importa automáticamente al iniciar los contenedores por primera vez.

| Servicio | Imagen | Descripción |
|---|---|---|
| `app` | `node:24-alpine` | Aplicación Node.js/Express |
| `db` | `mariadb:10.4.24` | Base de datos MariaDB |

---

## Instalación sin Docker

```bash
git clone https://github.com/guillermosalado/task-manager.git
cd task-manager
npm install
cp .env.example .env
mysql -u tu_usuario -p task_manager < database/schema.sql
node server.js
```

Abre tu navegador en `http://localhost:3000`

---

## Autor

| Nombre | GitHub |
|---|---|
| Guillermo López Salado | [guillermosalado](https://github.com/guillermosalado) |