document.addEventListener('DOMContentLoaded', () => {
    const temasContainer = document.getElementById('temas-container');
    const temaDetalleSection = document.getElementById('tema-detalle');
    const volverBtn = document.getElementById('volver-btn');
    
    // Elementos para mostrar detalles del tema
    const temaNombre = document.getElementById('tema-nombre');
    const temaDescripcion = document.getElementById('tema-descripcion');
    const temaPalabras = document.getElementById('tema-palabras');
    const practicasList = document.getElementById('practicas-list');

    // Cargar temas al iniciar
    cargarTemas();

    // Evento para volver a la lista de temas
    volverBtn.addEventListener('click', () => {
        temaDetalleSection.classList.add('hidden');
        temasContainer.classList.remove('hidden');
    });

    // Función para cargar la lista de temas
    async function cargarTemas() {
        try {
            const response = await fetch('/temas');
            if (!response.ok) {
                throw new Error('Error al cargar los temas');
            }
            
            const temas = await response.json();
            mostrarTemas(temas);
        } catch (error) {
            console.error('Error:', error);
            temasContainer.innerHTML = '<p class="error">No se pudieron cargar los temas. Intenta nuevamente más tarde.</p>';
        }
    }

    // Mostrar temas en la interfaz
    function mostrarTemas(temas) {
        temasContainer.innerHTML = '';
        
        temas.forEach(tema => {
            const temaCard = document.createElement('div');
            temaCard.className = 'tema-card';
            temaCard.innerHTML = `
                <h2>${tema.nombre}</h2>
                <p>${tema.descripcion}</p>
                <button class="btn-ver" data-id="${tema.id}">Ver detalles</button>
            `;
            
            temasContainer.appendChild(temaCard);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-ver').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const temaId = e.target.getAttribute('data-id');
                cargarTemaDetalle(temaId);
            });
        });
    }

    // Cargar detalles de un tema específico
    async function cargarTemaDetalle(temaId) {
        try {
            const response = await fetch(`/tema/${temaId}`);
            if (!response.ok) {
                throw new Error('Tema no encontrado');
            }
            
            const tema = await response.json();
            mostrarTemaDetalle(tema);
        } catch (error) {
            console.error('Error:', error);
            temaDetalleSection.innerHTML = '<p class="error">No se pudo cargar el tema seleccionado.</p>';
        }
    }

    // Mostrar detalles del tema en la interfaz
    function mostrarTemaDetalle(tema) {
        // Ocultar lista de temas y mostrar detalle
        temasContainer.classList.add('hidden');
        temaDetalleSection.classList.remove('hidden');
        
        // Llenar información del tema
        temaNombre.textContent = tema.nombre;
        temaDescripcion.textContent = tema.descripcion;
        
        // Limpiar y llenar palabras clave
        temaPalabras.innerHTML = '';
        tema.palabrasClaves.forEach(palabra => {
            const li = document.createElement('li');
            li.textContent = palabra;
            temaPalabras.appendChild(li);
        });
        
        // Limpiar y llenar prácticas
        practicasList.innerHTML = '';
        tema.practicas.forEach(practica => {
            const practicaCard = document.createElement('div');
            practicaCard.className = 'practica-card';
            practicaCard.innerHTML = `
                <h4>${practica.titulo}</h4>
                <p><strong>Descripción:</strong> ${practica.descripcion}</p>
                <p><strong>Objetivo:</strong> ${practica.objetivo}</p>
            `;
            practicasList.appendChild(practicaCard);
        });
    }
});