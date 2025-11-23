// Плавная прокрутка
function scrollToContent() {
    const booksSection = document.getElementById('books');
    booksSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Анимация навигации
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Параллакс эффект для теневых волн
    const shadowWaves = document.querySelector('.shadow-waves');
    if (shadowWaves) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            shadowWaves.style.transform = `translateY(${rate}px)`;
        });
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за карточками книг
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Наблюдаем за информационными блоками
    const infoSections = document.querySelectorAll('.author-info, .studio-info');
    infoSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Предзагрузка критических изображений
function preloadImages() {
    const criticalImages = [
        '/images/shadow.jpg',
        '/images/eligos.jpg',
        '/images/roma.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Запуск предзагрузки при загрузке страницы
window.addEventListener('load', preloadImages);