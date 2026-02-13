// Referanslar Slider - Sadece Mobilde Çalışır
(function() {
    'use strict';
    
    window.addEventListener('DOMContentLoaded', function() {
        
        // Mobil kontrolü
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            console.log('Desktop - Referanslar slider devre dışı');
            return; // Desktop'ta çalıştırma
        }
        
        const container = document.querySelector('.references-container');
        const items = document.querySelectorAll('.reference-item');
        const dotsContainer = document.querySelector('.references-dots');
        
        if (!container || items.length === 0) {
            console.log('Referanslar slider elemanları bulunamadı');
            return;
        }
        
        let currentIndex = 0;
        const totalItems = items.length;
        
        console.log('Referanslar slider başlatıldı (Mobil):', {
            totalItems: totalItems,
            isMobile: isMobile
        });
        
        // Dots oluştur
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalItems; i++) {
                const dot = document.createElement('div');
                dot.className = 'references-dot';
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
            
            // Her item %100 genişlikte, tek tek kayıyor
            const offset = -(100 * currentIndex);
            container.style.transform = `translateX(${offset}%)`;
            
            // Dots'u güncelle
            const dots = dotsContainer.querySelectorAll('.references-dot');
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Otomatik kayma
        function autoSlide() {
            currentIndex = (currentIndex + 1) % totalItems;
            goToSlide(currentIndex);
        }
        
        createDots();
        
        // 3 saniyede bir otomatik kay
        let autoSlideInterval = setInterval(autoSlide, 3000);
        
        // Mouse hover'da otomatik kaymayı durdur
        container.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        container.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(autoSlide, 3000);
        });
        
        // Touch events için
        container.addEventListener('touchstart', function() {
            clearInterval(autoSlideInterval);
        });
        
        container.addEventListener('touchend', function() {
            autoSlideInterval = setInterval(autoSlide, 3000);
        });
        
    });
    
})();
