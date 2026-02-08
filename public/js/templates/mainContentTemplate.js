export const mainContentTemplate = {
    guest: `
        <h2 class="h4 mb-4 text-center">¿Por qué Gestor de Tareas?</h2>
            
        <div class="card mb-3">
            <div class="card-body">
                <h3 class="h5 card-title">
                    <i class="fas fa-check-circle text-success"></i> Simple y Rápido
                </h3>
                <p class="card-text">
                    Gestiona tus tareas diarias sin complicaciones. Agrega, completa y organiza en segundos.
                </p>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h3 class="h5 card-title">
                    <i class="fas fa-lock text-primary"></i> Seguro y Privado
                </h3>
                <p class="card-text">
                    Tus tareas están protegidas. Solo tú tienes acceso a tu información.
                </p>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h3 class="h5 card-title">
                    <i class="fas fa-mobile-alt text-info"></i> Accesible desde cualquier lugar
                </h3>
                <p class="card-text">
                    Accede a tus tareas desde cualquier dispositivo con conexión a internet.
                </p>
            </div>
        </div>
    `,
    
    user: `
        <h2 class="h4 mb-4 text-center">Gestiona tus tareas con metodología Kanban</h2>
        
        <p class="lead text-center text-muted mb-5">
            Organiza tus pendientes por prioridad y mantén el control de tu productividad
        </p>

        <!-- Características del tablero Kanban -->
        <div class="row mb-4">
            <div class="col-md-4 mb-3">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-exclamation-circle fa-3x text-danger mb-3"></i>
                        <h4 class="h6 card-title font-weight-bold">Tareas Urgentes</h4>
                        <p class="card-text small text-muted">
                            Prioriza lo más importante y atiende primero lo que requiere acción inmediata
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-tasks fa-3x text-warning mb-3"></i>
                        <h4 class="h6 card-title font-weight-bold">Tareas Normales</h4>
                        <p class="card-text small text-muted">
                            Gestiona tus pendientes del día a día con prioridad media
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card h-100 border-0 shadow-sm">
                    <div class="card-body text-center">
                        <i class="fas fa-clock fa-3x text-info mb-3"></i>
                        <h4 class="h6 card-title font-weight-bold">Baja Prioridad</h4>
                        <p class="card-text small text-muted">
                            Tareas que puedes realizar cuando tengas tiempo disponible
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Funcionalidades -->
        <div class="card mb-4 border-0 shadow-sm">
            <div class="card-body">
                <h3 class="h6 mb-3">
                    ¿Qué puedes hacer en tu tablero?
                </h3>
                <ul class="mb-0">
                    <li class="mb-2">Crear nuevas tareas y asignarles prioridad</li>
                    <li class="mb-2">Editar y actualizar la información de tus tareas</li>
                    <li class="mb-2">Eliminar tareas completadas o innecesarias</li>
                    <li class="mb-0">Visualizar tu progreso de forma clara y organizada</li>
                </ul>
            </div>
        </div>
    `
};