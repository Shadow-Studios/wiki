// Основной код для страницы персонажей
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация персонажей...');
    
    // Инициализируем все компоненты
    initCharacterCards();
    initSearchFunctionality();
    loadAndInitModals();
    initObservers();
    preloadImages();
});

// ====================
// 1. ИНИЦИАЛИЗАЦИЯ КАРТОЧЕК ПЕРСОНАЖЕЙ
// ====================
function initCharacterCards() {
    const characterCards = document.querySelectorAll('.character-card');
    console.log(`Найдено карточек персонажей: ${characterCards.length}`);
    
    characterCards.forEach((card, index) => {
        // Эффекты при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(255, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.2)';
        });
        
        // Инициализация кнопки "Читать далее"
        const readMoreBtn = card.querySelector('.read-more-btn');
        if (readMoreBtn) {
            const characterId = readMoreBtn.getAttribute('data-modal');
            console.log(`Найдена кнопка для персонажа: ${characterId}`);
            
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Клик по кнопке: ${characterId}`);
                openModal(characterId);
            });
        } else {
            console.warn('Не найдена кнопка "Читать далее" в карточке', card);
        }
        
        // Начальные стили для анимации появления
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
    });
    
    // Обрезаем описания до 3 строк
    truncateDescriptions();
}

// ====================
// 2. ПОИСК ПЕРСОНАЖЕЙ
// ====================
function initSearchFunctionality() {
    const searchInput = document.getElementById('characterSearch');
    const noResultsMessage = document.getElementById('noResults');
    
    if (!searchInput) {
        console.warn('Не найден элемент поиска #characterSearch');
        return;
    }
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        console.log(`Поиск: "${searchTerm}"`);
        let visibleCards = 0;
        const characterCards = document.querySelectorAll('.character-card');
        
        characterCards.forEach(card => {
            const characterName = card.getAttribute('data-character-name').toLowerCase();
            const characterId = card.getAttribute('data-character-id').toLowerCase();
            
            if (characterName.includes(searchTerm) || 
                characterId.includes(searchTerm) || 
                searchTerm === '') {
                card.style.display = 'block';
                visibleCards++;
                
                // Анимация появления
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Сообщение "не найдено"
        if (noResultsMessage) {
            if (visibleCards === 0 && searchTerm !== '') {
                noResultsMessage.style.display = 'block';
                setTimeout(() => {
                    noResultsMessage.classList.add('show');
                }, 10);
            } else {
                noResultsMessage.classList.remove('show');
                setTimeout(() => {
                    if (!noResultsMessage.classList.contains('show')) {
                        noResultsMessage.style.display = 'none';
                    }
                }, 500);
            }
        }
    });
}

// ====================
// 3. МОДАЛЬНЫЕ ОКНА
// ====================
function loadAndInitModals() {
    // Создаем контейнер для модальных окон
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modals-container';
    modalContainer.style.display = 'none';
    document.body.appendChild(modalContainer);
    
    // Загружаем HTML с модальными окнами
    fetch('character-modals.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            console.log('Модальные окна успешно загружены');
            modalContainer.innerHTML = html;
            
            // Создаем оверлей для модального окна
            createModalOverlay();
            
            // Инициализируем кнопки в модальных окнах
            initModalButtons();
        })
        .catch(error => {
            console.error('Ошибка загрузки модальных окон:', error);
            showFallbackModal();
        });
}

function createModalOverlay() {
    // Создаем оверлей, если его еще нет
    if (!document.getElementById('characterModal')) {
        const modalOverlay = document.createElement('div');
        modalOverlay.id = 'characterModal';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <!-- Контент будет загружен динамически -->
            </div>
        `;
        document.body.appendChild(modalOverlay);
    }
}

function initModalButtons() {
    console.log('Инициализация кнопок модальных окон...');
    
    // Кнопки закрытия в каждом модальном окне
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Закрытие модального окна');
            closeModal();
        });
    });
}

function openModal(characterId) {
    console.log(`Открытие модального окна для: ${characterId}`);
    
    const modalOverlay = document.getElementById('characterModal');
    const modalContent = modalOverlay.querySelector('.modal-content');
    const targetModal = document.getElementById(`modal-${characterId}`);
    
    if (!targetModal) {
        console.error(`Модальное окно не найдено: modal-${characterId}`);
        showFallbackModalContent(characterId);
        return;
    }
    
    // Клонируем содержимое модального окна
    modalContent.innerHTML = targetModal.innerHTML;
    
    // Показываем оверлей
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Анимация появления
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'translateY(0) scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
    
    // Инициализируем кнопку закрытия
    const closeButton = modalContent.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику на оверлей
    modalOverlay.addEventListener('click', function modalOverlayClick(e) {
        if (e.target === modalOverlay) {
            closeModal();
            modalOverlay.removeEventListener('click', modalOverlayClick);
        }
    });
    
    // Закрытие по Escape
    const closeOnEscape = function(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
    
    console.log(`Модальное окно "${characterId}" успешно открыто`);
}

function closeModal() {
    console.log('Закрытие модального окна');
    
    const modalOverlay = document.getElementById('characterModal');
    const modalContent = modalOverlay.querySelector('.modal-content');
    
    // Анимация закрытия
    modalOverlay.style.opacity = '0';
    modalContent.style.transform = 'translateY(-20px) scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
        
        // Очищаем содержимое
        modalContent.innerHTML = '';
    }, 300);
}

function showFallbackModal() {
    console.log('Использование резервного варианта модальных окон');
    
    // Создаем простые модальные окна как fallback
    const modalContainer = document.getElementById('modals-container');
    const fallbackModals = `
        <div class="character-modal" id="modal-shadow" style="display: none;">
            <div class="modal-header">
                <h2 class="modal-title">Шедоу / Ефим</h2>
                <button class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <p>Подробная информация о Шедоу будет доступна в полной версии сайта.</p>
            </div>
        </div>
        <div class="character-modal" id="modal-eligos" style="display: none;">
            <div class="modal-header">
                <h2 class="modal-title">Элигос</h2>
                <button class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <p>Подробная информация об Элигосе будет доступна в полной версии сайта.</p>
            </div>
        </div>
    `;
    
    modalContainer.innerHTML = fallbackModals;
    createModalOverlay();
    initModalButtons();
}

function showFallbackModalContent(characterId) {
    const modalOverlay = document.getElementById('characterModal');
    const modalContent = modalOverlay.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${characterId}</h2>
            <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
            <p>Извините, подробная информация о персонаже временно недоступна.</p>
            <p>Попробуйте обновить страницу или зайти позже.</p>
        </div>
    `;
    
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'translateY(0) scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
    
    const closeButton = modalContent.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
}

// ====================
// 4. УТИЛИТЫ
// ====================
function initObservers() {
    // Intersection Observer для анимации появления карточек
    const characterCards = document.querySelectorAll('.character-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = Array.from(characterCards).indexOf(card);
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    characterCards.forEach(card => {
        observer.observe(card);
    });
}

function truncateDescriptions() {
    const briefElements = document.querySelectorAll('.character-brief');
    
    briefElements.forEach(element => {
        const originalText = element.textContent;
        const words = originalText.split(' ');
        
        // Обрезаем до примерно 20 слов для краткого описания
        if (words.length > 20) {
            const truncatedText = words.slice(0, 20).join(' ') + '...';
            element.textContent = truncatedText;
        }
        
        element.classList.add('truncated');
    });
}

function preloadImages() {
    const characterImages = [
        '/wiki/images/shadow.jpg',
        '/wiki/images/eligos.jpeg',
        '/wiki/images/roma.jpg',
        '/wiki/images/keepers.jpg',
        '/wiki/images/collector.jpeg',
        '/wiki/images/moth.jpeg'
    ];
    
    console.log('Предзагрузка изображений...');
    
    characterImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`Загружено: ${src}`);
        img.onerror = () => console.warn(`Ошибка загрузки: ${src}`);
    });
}

// ====================
// 5. ГЛОБАЛЬНЫЕ ФУНКЦИИ
// ====================
// Делаем функции доступными глобально для отладки
window.openModal = openModal;
window.closeModal = closeModal;
window.truncateDescriptions = truncateDescriptions;

console.log('Characters.js инициализирован');
