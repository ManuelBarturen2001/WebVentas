document.querySelector('.zoom').addEventListener('mousemove', function(e) {
    const zoom = this.querySelector('.zoom-lens');
    const img = this.querySelector('img');
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    zoom.style.display = 'block';
    zoom.style.left = x - 100 + 'px';
    zoom.style.top = y - 100 + 'px';

    const percentX = (x / this.offsetWidth) * 100;
    const percentY = (y / this.offsetHeight) * 100;

    img.style.transformOrigin = `${percentX}% ${percentY}%`;
    img.style.transform = 'scale(2)';
});

document.querySelector('.zoom').addEventListener('mouseleave', function() {
    const zoom = this.querySelector('.zoom-lens');
    const img = this.querySelector('img');

    zoom.style.display = 'none';
    img.style.transform = 'scale(1)';
});

// Borde negro dentro del carrusel
const carouselItems = document.querySelectorAll('.product-links-wap .carousel-item img');

carouselItems.forEach(item => {
    item.addEventListener('click', () => {
        // Quita la clase 'active' de todas las imágenes
        carouselItems.forEach(img => img.classList.remove('active'));

        // Agrega la clase 'active' a la imagen seleccionada
        item.classList.add('active');
    });
});
// AVISO DE QUE QUEDAN POCOS EN STOCK
const sizeButtons = document.querySelectorAll('.btn-size');
const stockMessage = document.querySelector('.stock-message');

sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const stock = parseInt(btn.dataset.stock);
        if (stock < 5) {
            stockMessage.style.display = 'inline-block';
        } else {
            stockMessage.style.display = 'none';
        }
    });
});