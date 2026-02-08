export const heroTemplate = {
    guest: `
        <h1 class="display-4 font-weight-bold">
            <i class="fas fa-clipboard-list"></i> Gestor de Tareas
        </h1>
        <p class="lead">Organiza tus tareas de forma simple y eficiente</p>
        <a href="/login" class="btn btn-primary btn-lg mt-3">
            Comenzar Ahora
        </a>
    `,
    user: `
        <h1 class="display-4 font-weight-bold">
            <i class="fas fa-user-circle"></i> ¡Bienvenido!
        </h1>
        <p class="lead">¿Listo para organizar tus tareas?</p>
        <div class="text-center mt-5">
            <a href="/kanban" class="btn btn-primary btn-lg px-5">
                <i class="fas fa-columns"></i> Ir a mi tablero Kanban
            </a>
        </div>
    `
};