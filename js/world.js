// Модуль для страницы World
const WorldPage = (function() {
    // Приватные переменные
    let currentGalleryIndex = 0;
    let galleryImages = [];
    let galleryThumbnails = [];

    // Инициализация галереи
    function initGallery() {
        galleryImages = document.querySelectorAll('.gallery-image');
        galleryThumbnails = document.querySelectorAll('.thumbnail');
        
        showGalleryImage(0);
        
        document.querySelector('.gallery-prev').addEventListener('click', showPrevImage);
        document.querySelector('.gallery-next').addEventListener('click', showNextImage);
        
        galleryThumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => showGalleryImage(index));
        });
    }

    function showGalleryImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryThumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        galleryImages[index].classList.add('active');
        galleryThumbnails[index].classList.add('active');
        
        currentGalleryIndex = index;
    }

    function showNextImage() {
        let nextIndex = (currentGalleryIndex + 1) % galleryImages.length;
        showGalleryImage(nextIndex);
    }

    function showPrevImage() {
        let prevIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        showGalleryImage(prevIndex);
    }

    // Инициализация модальных окон
    function initModals() {
        const modalOverlay = document.getElementById('modalOverlay');
        const pentagramItems = document.querySelectorAll('.pentagram-item');
        const closeButtons = document.querySelectorAll('.modal-close');

        // Открытие модального окна при клике на элемент пентограммы
        pentagramItems.forEach(item => {
            item.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            });
        });

        // Закрытие модального окна при клике на крестик
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModals);
        });

        // Закрытие модального окна при клике на оверлей
        modalOverlay.addEventListener('click', closeModals);

        // Закрытие модального окна при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModals();
            }
        });

        // Предотвращение закрытия при клике на само модальное окно
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    }

    function openModal(modalId) {
        const modalOverlay = document.getElementById('modalOverlay');
        const modal = document.getElementById(`modal${modalId.charAt(0).toUpperCase() + modalId.slice(1)}`);
        
        if (modal) {
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        }
    }

    function closeModals() {
        const modalOverlay = document.getElementById('modalOverlay');
        const modals = document.querySelectorAll('.modal');
        
        modalOverlay.classList.remove('active');
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = ''; // Разблокируем скролл страницы
    }

    // Плавная прокрутка для кнопки "Исследовать"
    function initSmoothScroll() {
        const exploreBtn = document.querySelector('.explore-btn');
        const gallerySection = document.querySelector('.gallery-section');
        
        if (exploreBtn && gallerySection) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                gallerySection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }

    // Публичные методы
    return {
        init: function() {
            console.log('Инициализация страницы World...');
            
            initGallery();
            initModals();
            initSmoothScroll();
            
            console.log('Страница World инициализирована!');
        },
        
        showGalleryImage: showGalleryImage,
        showNextImage: showNextImage,
        showPrevImage: showPrevImage,
        openModal: openModal,
        closeModals: closeModals
    };
})();

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    WorldPage.init();
});
