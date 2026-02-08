document.getElementById('formContacto').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    try {
        const res = await fetch('/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        
        if (res.ok) {
            alert('¡Mensaje enviado!');
            this.reset();
        } else {
            alert('Error al enviar');
        }
    } catch (error) {
        alert('Error de conexión');
    }
});