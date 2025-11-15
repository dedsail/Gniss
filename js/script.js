// Основной модуль навигации
const Navigation = (function() {
    const routeMap = {
    	'home': '#home',
        'world': '#world',
        'factions': '#factions', 
        'magic-tech': '#magic-tech',
        'cosmology': '#cosmology',
        'other': '#other'
    };
    
    // Приватные методы
    function handleNavClick(e) {
        e.preventDefault();
        
        const clickedItem = e.currentTarget;
        const allNavItems = document.querySelectorAll('.nav-item');
        
        // Убираем активный класс у всех элементов
        allNavItems.forEach(nav => nav.classList.remove('active'));
        
        // Добавляем активный класс к текущему элементу
        clickedItem.classList.add('active');
        
        // Получаем цель перехода
        const target = clickedItem.getAttribute('data-target');
        
        // Вызываем обработчик перехода
        handlePageTransition(target);
    }
    
    function handlePageTransition(target) {
        console.log('Переход к разделу:', target);
        
        const pageMap = {
            'home': 'hmpage.html',
            'world': 'world.html',
            'factions': 'faction.html',
            'magic-tech': 'tech.html',
            'cosmology': 'cosmology.html',
            'other': 'other.html'
        };
        
        if (pageMap[target] && pageMap[target] !== getCurrentPage()) {
            window.location.href = pageMap[target];
        }
    }
    
    function getCurrentPage() {
        return window.location.pathname.split('/').pop();
    }
    
    function setActiveNavBasedOnPage() {
        const currentPage = getCurrentPage();
        const pageToTargetMap = {
            'hmpage.html': 'home',
            'world.html': 'world',
            'faction.html': 'factions',
            'tech.html': 'magic-tech',
            'cosmology.html': 'cosmology',
            'other.html': 'other',
            '': 'home',
            '/': 'home'
        };
        
        const target = pageToTargetMap[currentPage] || 'home';
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === target) {
                item.classList.add('active');
            }
        });
    }
    
    function updateContent(section) {
        const contentDiv = document.querySelector('.content');
        if (!contentDiv) return;
        
        const sections = {
            home: {
                title: 'Главная страница',
                content: 'Добро пожаловать на главную страницу! Это демонстрация работы современной навигационной панели.'
            },
            about: {
                title: 'О нашей компании',
                content: 'Мы специализируемся на создании инновационных веб-решений с уникальным дизайном.'
            },
            services: {
                title: 'Наши услуги',
                content: 'Полный цикл разработки: от дизайна до реализации и поддержки вашего проекта.'
            },
            contact: {
                title: 'Контакты',
                content: 'Готовы обсудить ваш проект? Свяжитесь с нами удобным для вас способом.'
            }
        };
        
        if (sections[section]) {
            contentDiv.innerHTML = `
                <h1>${sections[section].title}</h1>
                <p>${sections[section].content}</p>
                <p>Наведите курсор на элементы навигации, чтобы увидеть плавную анимацию увеличения.</p>
            `;
        }
    }
    
    function handleNavHover(e) {
        // При наведении временно скрываем дивидоры у соседних элементов
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach(item => {
            if (item !== e.currentTarget) {
                item.style.borderRightColor = 'transparent';
                item.style.borderLeftColor = 'transparent';
            }
        });
    }
    
    function handleNavLeave(e) {
        // При уходе курсора восстанавливаем дивидоры
        const allNavItems = document.querySelectorAll('.nav-item');
        allNavItems.forEach((item, index) => {
            if (index < allNavItems.length - 1) {
                item.style.borderRightColor = default;
            }
            if (index > 0) {
            	item.style.borderLeftColor = 'rgba(186, 85, 211, 0.2)';
            }
        });
    }
    
    // Публичные методы
    return {
        init: function() {
            console.log('Инициализация навигации...');
            
            const navItems = document.querySelectorAll('.nav-item');
            
            // Добавляем обработчики событий
            navItems.forEach(item => {
                item.addEventListener('click', handleNavClick);
                item.addEventListener('mouseenter', handleNavHover);
                item.addEventListener('mouseleave', handleNavLeave);
            });
            
            // Устанавливаем активный элемент на основе текущей страницы
            setActiveNavBasedOnPage();
            
            console.log('Навигация инициализирована! Текущая страница:', getCurrentPage());
        },
        
        handlePageTransition: handlePageTransition,
        setActiveNavBasedOnPage: setActiveNavBasedOnPage
    };
})();

// Дополнительные утилиты для работы с навигацией
const NavUtils = {
    // Метод для программного переключения активного элемента
    setActiveNav: function(target) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === target) {
                item.classList.add('active');
            }
        });
        Navigation.handlePageTransition(target);
    },
    
    // Метод для получения текущего активного раздела
    getCurrentSection: function() {
        const activeItem = document.querySelector('.nav-item.active');
        return activeItem ? activeItem.getAttribute('data-target') : 'home';
    }
};

// Инициализация при полной загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    Navigation.init();
});

// Обработка изменения размера окна для адаптивности
window.addEventListener('resize', function() {
    // Можно добавить дополнительную логику при ресайзе
    console.log('Размер окна изменен:', window.innerWidth);
});

// Анимация появления элементов временной шкалы при прокрутке
function checkTimelineVisibility() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            item.classList.add('visible');
        }
    });
}

// Функции для модальных окон
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    checkTimelineVisibility();
});

window.addEventListener('scroll', checkTimelineVisibility);
