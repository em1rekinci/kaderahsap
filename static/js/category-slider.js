// Kategori Slider — Touch destekli
(function() {
    'use strict';

    window.addEventListener('DOMContentLoaded', function() {

        const track = document.querySelector('.category-track');
        const items = document.querySelectorAll('.category-item');
        const dotsContainer = document.querySelector('.category-dots');

        if (!track || items.length === 0) return;

        let currentIndex = 0;
        const isMobile = window.innerWidth <= 768;
        const itemsToShow = isMobile ? 2 : 4;
        const totalPages = Math.ceil(items.length / itemsToShow);

        // --- Touch desteği ---
        let touchStartX = 0;
        const SWIPE_THRESHOLD = 40;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                if (diff > 0) {
                    // Sola kaydır (ileri)
                    currentIndex = Math.min(currentIndex + 1, totalPages - 1);
                } else {
                    // Sağa kaydır (geri)
                    currentIndex = Math.max(currentIndex - 1, 0);
                }
                goToSlide(currentIndex);
            }
        }, { passive: true });

        // Dots oluştur
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = 'category-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', function() {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
        }

        // Slide'a git
        function goToSlide(index) {
            currentIndex = index;
            // Her sayfa = itemsToShow adet item. Her item %50 genişlikte (gap yok).
            // Kaydırma miktarı = container genişliği × pageIndex
            const containerWidth = track.parentElement.offsetWidth;
            const offset = -(containerWidth * currentIndex);
            track.style.transform = `translateX(${offset}px)`;

            const dots = dotsContainer.querySelectorAll('.category-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        // Otomatik kayma
        function autoSlide() {
            currentIndex = (currentIndex + 1) % totalPages;
            goToSlide(currentIndex);
        }

        createDots();

        let autoSlideInterval = setInterval(autoSlide, 4000);

        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoSlide, 4000);
        });
        track.addEventListener('touchstart', () => clearInterval(autoSlideInterval), { passive: true });
        track.addEventListener('touchend', () => {
            autoSlideInterval = setInterval(autoSlide, 4000);
        }, { passive: true });

        // Resize — sadece genişlik değişiminde
        let lastWidth = window.innerWidth;
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (Math.abs(window.innerWidth - lastWidth) > 50) {
                    lastWidth = window.innerWidth;
                    currentIndex = 0;
                    createDots();
                    goToSlide(0);
                }
            }, 300);
        });
    });

})();
