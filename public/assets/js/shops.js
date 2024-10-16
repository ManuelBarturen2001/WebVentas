//----------- ABRIR Y CERRRAR FILTROS -----------------
document.querySelectorAll('.templatemo-accordion a').forEach(function(element) {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        let collapse = this.nextElementSibling;
        this.classList.toggle('collapsed');
        // Obtener la altura real del contenido del colapso
        let contentHeight = collapse.scrollHeight;
        
        // Si el colapso está cerrado, establecer la altura máxima para mostrar el contenido
        if (!this.classList.contains('collapsed')) {
            this.classList.remove('collapsed');
            collapse.classList.add('show');
            collapse.style.maxHeight = collapse.scrollHeight + 'px';
        } else {
            this.classList.add('collapsed');
            //collapse.classList.remove('show');
            collapse.style.maxHeight = null;
        }
    });
});
//----------- FIN ABRIR Y CERRAR FILTROS---------------
// ----------- PARA APLICAR LOS FILTROS --------------
$(document).ready(function () {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);

    // Marcar los checkboxes según los parámetros de la URL
    markCheckboxes(urlParams);

    // Filtrar los productos
    filterProducts(1);

    // Agregar evento a los checkboxes
    $('input[type="checkbox"]').on('change', function () {
        filterProducts(1);
    });

    // Agregar evento a los enlaces de paginación
    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const page = $(this).attr('href').split('=')[1];
        filterProducts(page);
    });
});

function markCheckboxes(urlParams) {
    const filters = getAllFilters();
    filters.forEach(filter => {
        const values = urlParams.getAll(filter);
        values.forEach(value => {
            $(`#${filter}-${value}`).prop('checked', true);
        });
    });
}

function filterProducts(page = 1) {
    const filters = getAllFilters();
    const filterValues = {};
    const sortOrder = $('#sortOrder').val();

    // Obtener los valores de los filtros seleccionados
    filters.forEach(filter => {
        filterValues[filter] = [];
        $(`input[id^="${filter}-"]:checked`).each(function () {
            filterValues[filter].push($(this).val());
        });
    });
    
    // Construir la nueva URL
    let newUrl = '/store/shop?page=' + page;
    Object.keys(filterValues).forEach(filter => {
        filterValues[filter].forEach(value => {
            newUrl += `&${filter}=${value}`;
        });
    });

    // Agregar el parámetro de ordenamiento si existe
    if (sortOrder) {
        newUrl += `&sortOrder=${sortOrder}`;
    }
    // Actualizar la URL sin recargar la página
    history.pushState({}, '', newUrl);
    // Filtrar los productos
    $.ajax({
        url: newUrl,
        success: function (data) {
            // Extraer solo la sección de productos
            const productos = $(data).find('#productos').html();
            $('#productos').html(productos);

            // Mantener los checkboxes seleccionados
            markCheckboxes(new URLSearchParams(newUrl));

            // Actualizar la paginación
            const pagination = $(data).find('.pagination').html();
            $('.pagination').html(pagination);
        }
    });
}

function getAllFilters() {
    // Obtener todos los filtros disponibles
    const filters = [''];
    $('input[type="checkbox"]').each(function () {
        const id = $(this).attr('id');
        const parts = id.split('-');
        if (parts.length > 1) {
            const filter = parts[0];
            if (!filters.includes(filter)) {
                filters.push(filter);
            }
        }
    });
    return filters;
}
// ----------- FIN PARA APLICAR LOS FILTROS ----------
$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
});