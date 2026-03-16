// Referanslar Slider - Mobilde Swipe + Otomatik Geçiş
(function() {
    'use strict';

    window.addEventListener('DOMContentLoaded', function() {

        if (window.innerWidth > 768) return;

        const container    = document.querySelector('.references-container');
        const dotsContainer = document.querySelector('.references-dots');
        if (!container) return;

        const items = document.querySelectorAll('.reference-item');
        const totalItems = items.length;
        if (totalItems === 0) return;

        let currentIndex = 0;
        let autoSlideInterval = null;

        // Dots oluştur
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalItems; i++) {
                const dot = document.createElement('div');
                dot.className = 'references-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', function() { goToSlide(i); });
                dotsContainer.appendChild(dot);
            }
        }

        // Slide'a git
        function goToSlide(index) {
            currentIndex = (index + totalItems) % totalItems;
            container.style.transform = `translateX(${-100 * currentIndex}%)`;
            const dots = dotsContainer.querySelectorAll('.references-dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
        }

        function autoSlide() {
            goToSlide(currentIndex + 1);
        }

        function startAuto() {
            stopAuto();
            autoSlideInterval = setInterval(autoSlide, 3000);
        }

        function stopAuto() {
            clearInterval(autoSlideInterval);
        }

        createDots();
        startAuto();

        // Mouse hover
        container.addEventListener('mouseenter', stopAuto);
        container.addEventListener('mouseleave', startAuto);

        // Touch swipe
        let touchStartX = 0;

        container.addEventListener('touchstart', function(e) {
            stopAuto();
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        container.addEventListener('touchend', function(e) {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
                goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
            }
            startAuto();
        }, { passive: true });

    });

})();
