function openImage(img) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');

    if (!modal || !modalImg) return;

    modal.style.display = 'flex';
    modalImg.src = img.src;

    // Скрываем footer при открытии модального окна
    const footer = document.querySelector('footer');
    footer.style.display = 'none';

    // Добавляем обработчик события для нажатия клавиши Esc
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeImage();
        }
    });

    // Блокируем скроллинг при открытом модальном окне
    document.body.style.overflow = 'hidden';
}

function closeImage(event) {
    if (!event || event.target === document.getElementById('modal')) {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Восстанавливаем скроллинг

        // Восстанавливаем отображение footer
        const footer = document.querySelector('footer');
        footer.style.display = 'block';
    }
}

// Добавляем обработчик события для закрытия модального окна при клике за его пределами
document.getElementById('modal').addEventListener('click', function (event) {
    if (event.target === this) {
        closeImage();
    }
});


