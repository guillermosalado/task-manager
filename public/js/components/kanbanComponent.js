import { kanbanTemplate } from '../templates/kanbanTemplate.js';

let todasLasTareas = [];
let prioridadSeleccionada = 'normal'; // Variable para guardar la prioridad del botón clickeado

// Cargar tareas al inicio
async function cargarTareas() {
    try {
        const res = await fetch('/tasks');
        const tareas = await res.json();
        todasLasTareas = tareas;
        renderizarTareas(tareas);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
    }
}

// Renderizar tareas en el tablero
function renderizarTareas(tareas) {
    // Limpiar columnas
    document.querySelectorAll('.kanban-column').forEach(col => {
        const contenedor = col.querySelector('.task-cards-container');
        if (contenedor) contenedor.innerHTML = '';
    });

    // Separar por prioridad y estado
    const urgentes = tareas.filter(t => t.priority === 'urgente' && t.status === 'pendiente');
    const normales = tareas.filter(t => t.priority === 'normal' && t.status === 'pendiente');
    const bajas = tareas.filter(t => t.priority === 'baja' && t.status === 'pendiente');
    const completadas = tareas.filter(t => t.status === 'completada');

    // Renderizar en cada columna
    renderizarColumna(0, urgentes);
    renderizarColumna(1, normales);
    renderizarColumna(2, bajas);
    renderizarColumna(3, completadas);

    // Actualizar contadores
    actualizarContadores(urgentes.length, normales.length, bajas.length, completadas.length);
}

// Renderizar tareas en una columna específica
function renderizarColumna(indice, tareas) {
    const columnas = document.querySelectorAll('.kanban-column');
    const columna = columnas[indice];
    if (!columna) return;

    let contenedor = columna.querySelector('.task-cards-container');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.className = 'task-cards-container';
        const botonAgregar = columna.querySelector('.add-task-btn');
        if (botonAgregar) {
            columna.insertBefore(contenedor, botonAgregar);
        } else {
            columna.appendChild(contenedor);
        }
    }

    tareas.forEach(tarea => {
        const card = crearTarjeta(tarea);
        contenedor.appendChild(card);
    });
}

// Crear HTML de una tarjeta
function crearTarjeta(tarea) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.dataset.id = tarea.id;

    const fecha = tarea.due_date ? new Date(tarea.due_date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : '';
    const esCompletada = tarea.status === 'completada';

    div.innerHTML = `
        <div class="task-title">${tarea.title}</div>
        <div class="task-description">${tarea.description || ''}</div>
        <div class="task-footer">
            <small>
                ${esCompletada 
                    ? '<i class="fas fa-check"></i> Completada' 
                    : `<i class="far fa-calendar"></i> ${fecha || 'Sin fecha'}`
                }
            </small>
            <div class="task-actions">
                ${!esCompletada ? `
                    <button class="btn btn-sm btn-outline-success" onclick="window.completarTarea(${tarea.id})" title="Completar">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary" onclick="window.editarTarea(${tarea.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                ` : ''}
                <button class="btn btn-sm btn-outline-danger" onclick="window.eliminarTarea(${tarea.id})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    return div;
}

// Actualizar contadores
function actualizarContadores(urgentes, normales, bajas, completadas) {
    const badges = document.querySelectorAll('.badge');
    if (badges[0]) badges[0].textContent = urgentes;
    if (badges[1]) badges[1].textContent = normales;
    if (badges[2]) badges[2].textContent = bajas;
    if (badges[3]) badges[3].textContent = completadas;
}

// Abrir modal para nueva tarea con prioridad preseleccionada
window.abrirModalNueva = function(prioridad) {
    prioridadSeleccionada = prioridad;
    const modalHTML = kanbanTemplate.modalTarea(null, prioridad);
    mostrarModal(modalHTML);

    document.getElementById('formTarea').addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarTarea();
    });
};

// Editar tarea
window.editarTarea = function(id) {
    const tarea = todasLasTareas.find(t => t.id === id);
    if (!tarea) return;

    const modalHTML = kanbanTemplate.modalTarea(tarea);
    mostrarModal(modalHTML);

    document.getElementById('formTarea').addEventListener('submit', async (e) => {
        e.preventDefault();
        await guardarTarea(id);
    });
};

// Guardar tarea (crear o actualizar)
async function guardarTarea(id = null) {
    const datos = {
        title: document.getElementById('titulo').value,
        description: document.getElementById('descripcion').value,
        priority: document.getElementById('prioridad').value,
        due_date: document.getElementById('fecha').value || null
    };

    try {
        const url = id ? `/tasks/${id}` : '/tasks';
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (res.ok) {
            cerrarModal();
            await cargarTareas();
        } else {
            alert('Error al guardar la tarea');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
    }
}

// Completar tarea
window.completarTarea = async function(id) {
    try {
        const res = await fetch(`/tasks/${id}/complete`, {
            method: 'PUT'
        });

        if (res.ok) {
            await cargarTareas();
        } else {
            alert('Error al completar la tarea');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Eliminar tarea
window.eliminarTarea = function(id) {
    const modalHTML = kanbanTemplate.modalConfirmar('¿Estás seguro de eliminar esta tarea?');
    mostrarModal(modalHTML);

    document.getElementById('btnConfirmar').addEventListener('click', async () => {
        try {
            const res = await fetch(`/tasks/${id}`, { method: 'DELETE' });

            if (res.ok) {
                cerrarModal();
                await cargarTareas();
            } else {
                alert('Error al eliminar la tarea');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
};

// Mostrar modal
function mostrarModal(html) {
    const contenedor = document.createElement('div');
    contenedor.id = 'modalContainer';
    contenedor.innerHTML = html;
    document.body.appendChild(contenedor);
}

// Cerrar modal
window.cerrarModal = function() {
    const modal = document.getElementById('modalContainer');
    if (modal) modal.remove();
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarTareas();

    // Botones "Agregar tarea" con su prioridad correspondiente
    const botones = document.querySelectorAll('.add-task-btn');
    const prioridades = ['urgente', 'normal', 'baja'];
    
    botones.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            abrirModalNueva(prioridades[index]);
        });
    });
});