// Kategori Slider - Basit ve Çalışan Versiyon
(function() {
    'use strict';
    
    // Sayfa tamamen yüklenene kadar bekle
    window.addEventListener('DOMContentLoaded', function() {
        
        const track = document.querySelector('.category-track');
        const items = document.querySelectorAll('.category-item');
        const dotsContainer = document.querySelector('.category-dots');
        
        if (!track || items.length === 0) {
            console.log('Kategori slider elemanları bulunamadı');
            return;
        }
        
        let currentIndex = 0;
        const isMobile = window.innerWidth <= 768;
        const itemsToShow = isMobile ? 2 : 4; // Desktop: 4, Mobil: 2
        const totalPages = Math.ceil(items.length / itemsToShow);
        
        console.log('Kategori slider başlatıldı:', {
            totalItems: items.length,
            itemsToShow: itemsToShow,
            totalPages: totalPages,
            isMobile: isMobile
        });
        
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
            
            // Her item'in genişliği + gap
            const itemWidth = items[0].offsetWidth;
            const gap = isMobile ? 30 : 50;
            const offset = -(itemWidth + gap) * itemsToShow * currentIndex;
            
            track.style.transform = `translateX(${offset}px)`;
            
            // Dots'u güncelle
            const dots = dotsContainer.querySelectorAll('.category-dot');
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
            currentIndex = (currentIndex + 1) % totalPages;
            goToSlide(currentIndex);
        }
        
        // Başlat
        createDots();
        
        // 5 saniyede bir otomatik kay
        let autoSlideInterval = setInterval(autoSlide, 5000);
        
        // Mouse hover'da otomatik kaymayı durdur
        track.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        track.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(autoSlide, 5000);
        });
        
        // Window resize'da yeniden hesapla
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                location.reload(); // Basit çözüm: sayfayı yenile
            }, 500);
        });
    });
    
})();
