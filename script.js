// Función para generar IDs únicos
let detalleCounter = 0;

function toggleDetalle(button) {
    // Obtener el contenedor de la tarjeta
    const card = button.closest('.product-card');
    
    // Si no tiene ID, asignarle uno
    if (!card.id) {
        card.id = 'card-' + (++detalleCounter);
    }
    
    // Buscar el elemento de detalles dentro de esta tarjeta específica
    const detalle = card.querySelector('.plato-detalle');
    
    if (detalle) {
        // Verificar el estado actual de manera más robusta
        const computedStyle = window.getComputedStyle(detalle);
        const isVisible = detalle.style.display === 'block' || computedStyle.display === 'block';
        
        // Toggle del display
        if (isVisible) {
            detalle.style.display = 'none';
        } else {
            detalle.style.display = 'block';
        }
        
        console.log('Toggle detalle para tarjeta:', card.id, 'Estado:', detalle.style.display);
    }
}

// Función para inicializar todos los detalles como cerrados
function initializeDetalles() {
    const detalles = document.querySelectorAll('.plato-detalle');
    detalles.forEach((detalle, index) => {
        // Forzar que esté cerrado
        detalle.style.display = 'none';
        
        // Asignar ID a la tarjeta si no lo tiene
        const card = detalle.closest('.product-card');
        if (card && !card.id) {
            card.id = 'card-' + (++detalleCounter);
        }
    });
    
    // Agregar event listeners a todos los botones de detalle
    const botonesDetalle = document.querySelectorAll('.btn-detalle');
    botonesDetalle.forEach(boton => {
        // Remover onclick existente y agregar event listener
        boton.removeAttribute('onclick');
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDetalle(this);
        });
    });
    
    console.log('Inicialización completada. Detalles cerrados:', detalles.length, 'Botones configurados:', botonesDetalle.length);
}

// Ejecutar inicialización cuando se cargue la página
document.addEventListener('DOMContentLoaded', initializeDetalles);

// También ejecutar cuando la ventana se cargue completamente
window.addEventListener('load', function() {
    // Verificar que todos los detalles estén cerrados
    const detalles = document.querySelectorAll('.plato-detalle');
    detalles.forEach(detalle => {
        if (window.getComputedStyle(detalle).display !== 'none') {
            detalle.style.display = 'none';
        }
    });
});

