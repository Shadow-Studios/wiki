// Функциональность для галереи
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    
    // Создаем модальное окно для просмотра изображений
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-caption">
                <h3></h3>
                <p></p>
            </div>
            <button class="modal-nav prev">‹</button>
            <button class="modal-nav next">›</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Стили для модального окна
    const modalStyles = `
        .gallery-modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .modal-content {
            position: relative;
            margin: auto;
            padding: 20px;
            max-width: 90%;
            max-height: 90%;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
        }
        
        .modal-image {
            max-width: 100%;
            max-height: 70vh;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(255, 0, 0, 0.3);
        }
        
        .modal-caption {
            margin-top: 1rem;
            color: #fff;
        }
        
        .modal-caption h3 {
            font-family: 'Arial Black', Arial, sans-serif;
            margin-bottom: 0.5rem;
            color: #ff0000;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 35px;
            color: #fff;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 2001;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover {
            color: #ff0000;
        }
        
        .modal-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 0, 0, 0.7);
            color: white;
            border: none;
            font-size: 24px;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
            transition: background 0.3s ease;
        }
        
        .modal-nav:hover {
            background: rgba(255, 0, 0, 0.9);
        }
        
        .modal-nav.prev {
            left: 10px;
        }
        
        .modal-nav.next {
            right: 10px;
        }
        
        @media (max-width: 768px) {
            .modal-nav {
                font-size: 18px;
                padding: 8px 12px;
            }
            
            .close-modal {
                font-size: 30px;
                top: 10px;
                right: 20px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    // Функции для работы с модальным окном
    function openModal(index) {
        currentImageIndex = index;
        const item = galleryItems[index];
        const img = item.querySelector('.gallery-image');
        const caption = item.querySelector('.gallery-caption');
        
        modal.querySelector('.modal-image').src = img.src;
        modal.querySelector('.modal-caption h3').textContent = caption.querySelector('h3').textContent;
        modal.querySelector('.modal-caption p').textContent = caption.querySelector('p').textContent;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        openModal(currentImageIndex);
    }
    
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentImageIndex);
    }
    
    // Обработчики событий для галереи
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => openModal(index));
    });
    
    // Обработчики для модального окна
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.modal-nav.next').addEventListener('click', nextImage);
    modal.querySelector('.modal-nav.prev').addEventListener('click', prevImage);
    
    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Навигация клавишами
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });
    
    // Анимация появления элементов галереи
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                
                const index = Array.from(galleryItems).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Инициализация анимации
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Предзагрузка изображений галереи
function preloadGalleryImages() {
    const galleryImages = [];
    for (let i = 1; i <= 8; i++) {
        galleryImages.push(`/images/art${i}.jpg`);
    }
    
    galleryImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadGalleryImages);