# Gestor de Tareas Web (Task Manager)
Es una aplicación web con el propósito de administrar tareas en un formato estilo kanban

## Características
- Estilo Kanban
- Fácil de utilizar

## Tecnologías utilizadas
**Frontend:**
- HTML5
- CSS3
- Bootstrap 4.6

**Backend:**
- Node.js 24.13.0
- Express
- Express-session
- MySQL

## Requisitos Previos
- Node.js 24.13.0 o superior
- MySQL instalado y configurado

## Instalación
1. Clona el repositorio
```bash
   git clone https://github.com/guillermosalado/task-manager.git
   cd task-manager
```

2. Instala las dependencias:
```bash
   npm install
```

3. Configura las variables de entorno:
   - Copia el archivo `.env.example` a `.env`
   - Ajusta las credenciales de tu base de datos

4. Importa el schema de la base de datos:
```bash
   mysql -u tu_usuario -p task_manager < src/config/schema.sql
```

5. Ejecuta el servidor:
```bash
   node server.js
```

6. Abre tu navegador en `http://localhost:3000`

## Autor
Guillermo Salado - [GitHub](https://github.com/guillermosalado)