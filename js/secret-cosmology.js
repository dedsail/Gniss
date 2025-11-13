// Скрипт для анимации черной дыры
const SecretCosmology = (function() {
    // Приватные переменные
    let animationFrameId;

    // Инициализация
    function init() {
        console.log('Инициализация секретной космологии...');
        startBlackHoleAnimation();
        setupInteractions();
    }

    // Анимация черной дыры
    function startBlackHoleAnimation() {
        let time = 0;
        
        function animate() {
            time += 0.005;
            
            // Плавное пульсирование черной дыры
            const blackHole = document.querySelector('.black-hole-container');
            const scale = 1 + Math.sin(time) * 0.01;
            blackHole.style.transform = `translate(-50%, -50%) scale(${scale})`;
            
            // Легкое вращение свечения
            const glow = document.querySelector('.event-horizon-glow');
            const rotation = time * 0.5;
            glow.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Взаимодействия
    function setupInteractions() {
        // Эффект при наведении на черную дыру
        const blackHole = document.querySelector('.black-hole-container');
        
        blackHole.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.2)';
        });
        
        blackHole.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
        
        // Параллакс эффект для звезд при движении мыши
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const stars = document.querySelector('.stars');
            stars.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
        });
    }

    // Очистка
    function cleanup() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    // Публичные методы
    return {
        init: init,
        cleanup: cleanup
    };
})();

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    SecretCosmology.init();
});

// Очистка при уходе со страницы
window.addEventListener('beforeunload', function() {
    SecretCosmology.cleanup();
});
