// Секретная игра - последовательность букв "КОСМОЛОГИЯ"
const SecretGame = (function() {
    // Приватные переменные
    const targetWord = 'КОСМОЛОГИЯ';
    let enteredLetters = '';
    let progressElement;
    let enteredLettersElement;
    let progressFillElement;

    // Инициализация игры
    function init() {
        console.log('Секретная игра инициализирована...');
        
        // Находим элементы прогресса
        progressElement = document.getElementById('secretProgress');
        enteredLettersElement = document.getElementById('enteredLetters');
        progressFillElement = document.getElementById('progressFill');
        
        // Добавляем обработчики для букв
        const secretLetters = document.querySelectorAll('.secret-letter');
        secretLetters.forEach(letter => {
            letter.addEventListener('click', handleLetterClick);
        });
        
        // Скрываем индикатор прогресса изначально
        hideProgress();
        
        // Добавляем обработчик сброса при неправильной последовательности
        document.addEventListener('click', function(e) {
            if (!e.target.classList.contains('secret-letter') && e.target.id !== 'secretProgress') {
                // Сброс при клике вне букв (но не сразу, чтобы дать шанс)
                setTimeout(() => {
                    if (enteredLetters.length > 0 && enteredLetters.length < targetWord.length) {
                        resetProgress();
                    }
                }, 3000);
            }
        });
    }

    // Обработка клика по букве
    function handleLetterClick(e) {
        const clickedLetter = e.target.getAttribute('data-letter');
        const expectedLetter = targetWord[enteredLetters.length];
        
        if (clickedLetter === expectedLetter) {
            // Правильная буква
            enteredLetters += clickedLetter;
            updateProgress();
            
            // Легкая анимация правильного выбора
            e.target.style.color = '#a044ff';
            e.target.style.textShadow = '0 0 10px rgba(160, 68, 255, 0.8)';
            
            setTimeout(() => {
                e.target.style.color = '';
                e.target.style.textShadow = '';
            }, 1000);
            
            // Проверка завершения слова
            if (enteredLetters === targetWord) {
                completeGame();
            }
        } else {
            // Неправильная буква - сброс
            wrongLetterAnimation(e.target);
            resetProgress();
        }
    }

    // Обновление индикатора прогресса
    function updateProgress() {
        showProgress();
        enteredLettersElement.textContent = enteredLetters.split('').join(' ');
        
        const progress = (enteredLetters.length / targetWord.length) * 100;
        progressFillElement.style.width = progress + '%';
        
        // Изменение цвета прогресса
        if (progress < 33) {
            progressFillElement.style.background = '#ff4444';
        } else if (progress < 66) {
            progressFillElement.style.background = '#ffaa00';
        } else {
            progressFillElement.style.background = '#44ff44';
        }
    }

    // Анимация неправильной буквы
    function wrongLetterAnimation(element) {
        element.style.color = '#ff4444';
        element.style.textShadow = '0 0 10px rgba(255, 68, 68, 0.8)';
        
        setTimeout(() => {
            element.style.color = '';
            element.style.textShadow = '';
        }, 1000);
    }

    // Сброс прогресса
    function resetProgress() {
        enteredLetters = '';
        hideProgress();
        
        // Сбрасываем все буквы к исходному состоянию
        const secretLetters = document.querySelectorAll('.secret-letter');
        secretLetters.forEach(letter => {
            letter.style.color = '';
            letter.style.textShadow = '';
        });
    }

    // Завершение игры
    function completeGame() {
        console.log('Секретная игра завершена!');
        
        // Специальная анимация завершения
        progressFillElement.style.background = 'linear-gradient(45deg, #a044ff, #6a3093)';
        progressElement.style.background = 'rgba(20, 10, 40, 0.95)';
        
        // Показываем сообщение о успехе
        enteredLettersElement.innerHTML = '✓ КОСМОЛОГИЯ ✓';
        enteredLettersElement.style.color = '#a044ff';
        enteredLettersElement.style.textShadow = '0 0 15px rgba(160, 68, 255, 0.8)';
        
        // Анимация всех букв
        const secretLetters = document.querySelectorAll('.secret-letter');
        secretLetters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.color = '#a044ff';
                letter.style.textShadow = '0 0 10px rgba(160, 68, 255, 0.8)';
                letter.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    letter.style.transform = 'scale(1)';
                }, 300);
            }, index * 100);
        });
        
        // Переход на секретную страницу через 2 секунды
        setTimeout(() => {
            window.location.href = 'secret-cosmology.html';
        }, 2000);
    }

    // Показать индикатор прогресса
    function showProgress() {
        progressElement.style.opacity = '1';
        progressElement.style.visibility = 'visible';
    }

    // Скрыть индикатор прогресса
    function hideProgress() {
        progressElement.style.opacity = '0';
        progressElement.style.visibility = 'hidden';
    }

    // Публичные методы
    return {
        init: init,
        reset: resetProgress
    };
})();

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    SecretGame.init();
});
