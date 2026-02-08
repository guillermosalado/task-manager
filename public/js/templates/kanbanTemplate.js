export const kanbanTemplate = {
    // Modal para crear/editar tarea
    modalTarea: (tarea = null, prioridadDefault = 'normal') => {
        const esEdicion = tarea !== null;
        const titulo = esEdicion ? 'Editar Tarea' : 'Nueva Tarea';
        const botonTexto = esEdicion ? 'Guardar Cambios' : 'Crear Tarea';
        const prioridad = tarea ? tarea.priority : prioridadDefault;
        
        return `
            <div class="modal-overlay" id="modalOverlay">
                <div class="modal-container">
                    <div class="modal-header-custom">
                        <h5><i class="fas fa-${esEdicion ? 'edit' : 'plus-circle'}"></i> ${titulo}</h5>
                        <button class="close-modal" onclick="window.cerrarModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body-custom">
                        <form id="formTarea">
                            <input type="hidden" id="taskId" value="${tarea?.id || ''}">
                            
                            <div class="form-group">
                                <label for="titulo">Título</label>
                                <input type="text" class="form-control" id="titulo" 
                                    value="${tarea?.title || ''}" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="descripcion">Descripción</label>
                                <textarea class="form-control" id="descripcion" rows="3">${tarea?.description || ''}</textarea>
                            </div>
                            
                            <div class="form-group">
                                <label for="prioridad">Prioridad</label>
                                <select class="form-control" id="prioridad">
                                    <option value="urgente" ${prioridad === 'urgente' ? 'selected' : ''}>🔴 Urgente</option>
                                    <option value="normal" ${prioridad === 'normal' ? 'selected' : ''}>🟡 Normal</option>
                                    <option value="baja" ${prioridad === 'baja' ? 'selected' : ''}>🔵 Baja</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="fecha">Fecha límite</label>
                                <input type="date" class="form-control" id="fecha" 
                                    value="${tarea?.due_date || ''}">
                            </div>
                            
                            <div class="modal-footer-custom">
                                <button type="button" class="btn btn-secondary" onclick="window.cerrarModal()">
                                    Cancelar
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> ${botonTexto}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
    },

    // Modal de confirmación para eliminar
    modalConfirmar: (mensaje) => `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-container modal-small">
                <div class="modal-header-custom bg-danger text-white">
                    <h5><i class="fas fa-exclamation-triangle"></i> Confirmar</h5>
                </div>
                <div class="modal-body-custom">
                    <p class="mb-4">${mensaje}</p>
                    <div class="modal-footer-custom">
                        <button class="btn btn-secondary" onclick="window.cerrarModal()">
                            Cancelar
                        </button>
                        <button class="btn btn-danger" id="btnConfirmar">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
};