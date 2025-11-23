// Анимации для страницы персонажей
document.addEventListener('DOMContentLoaded', function() {
    // Эффект всплывающей тени для карточек персонажей
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(255, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.2)';
        });
    });

    // Анимация появления карточек при скролле
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Добавляем задержку для последовательного появления
                const index = Array.from(characterCards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Инициализация анимации появления
    characterCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
        observer.observe(card);
    });

    // Фильтрация персонажей (для будущего расширения)
    const filterButtons = document.createElement('div');
    filterButtons.className = 'character-filters';
    filterButtons.innerHTML = `
        <button class="filter-btn active" data-filter="all">Все</button>
        <button class="filter-btn" data-filter="main">Главные</button>
        <button class="filter-btn" data-filter="keepers">Хранители</button>
        <button class="filter-btn" data-filter="antagonists">Антагонисты</button>
    `;
    
    const charactersSection = document.querySelector('.characters-section');
    charactersSection.insertBefore(filterButtons, charactersSection.querySelector('.characters-grid'));

    // Стили для кнопок фильтрации
    const filterStyles = `
        .character-filters {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            background: linear-gradient(45deg, #1a0000, #2a0000);
            color: #fff;
            border: 1px solid #333;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Arial Black', Arial, sans-serif;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: linear-gradient(45deg, #ff0000, #8b0000);
            border-color: #ff0000;
            transform: translateY(-2px);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = filterStyles;
    document.head.appendChild(styleSheet);

    // Обработчики для фильтрации
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterCharacters(filter);
        });
    });

    function filterCharacters(filter) {
        characterCards.forEach(card => {
            const character = card.getAttribute('data-character');
            let show = false;
            
            switch(filter) {
                case 'all':
                    show = true;
                    break;
                case 'main':
                    show = ['shadow', 'roma', 'eligos'].includes(character);
                    break;
                case 'keepers':
                    show = character === 'keepers';
                    break;
                case 'antagonists':
                    show = ['collector', 'eligos'].includes(character);
                    break;
                default:
                    show = true;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }
});

// Предзагрузка изображений персонажей
function preloadCharacterImages() {
    const characterImages = [
        '/images/shadow.jpg',
        '/images/eligos.jpg',
        '/images/roma.jpg',
        '/images/keepers.jpg',
        '/images/collector.jpg',
        '/images/moth.jpg'
    ];
    
    characterImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadCharacterImages);