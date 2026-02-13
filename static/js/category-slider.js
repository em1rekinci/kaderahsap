// Kategori Slider - İyileştirilmiş Versiyon
document.addEventListener('DOMContentLoaded', function() {
    const categoryTrack = document.querySelector('.category-track');
    const categoryItems = document.querySelectorAll('.category-item');
    const categoryDotsContainer = document.querySelector('.category-dots');
    
    if (!categoryTrack || categoryItems.length === 0) {
        console.log('Kategori slider bulunamadı');
        return;
    }
    
    let currentPage = 0;
    const itemsPerView = window.innerWidth > 768 ? 5 : 2;
    const totalPages = Math.ceil(categoryItems.length / itemsPerView);
    
    // Dots oluştur
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('category-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        categoryDotsContainer.appendChild(dot);
    }
    
    function goToPage(pageIndex) {
        currentPage = pageIndex;
        
        // Sayfa başına kaç item gösterilecek
        const itemWidth = categoryItems[0].offsetWidth;
        const gap = 60; // CSS'deki gap değeri
        const moveAmount = -(itemWidth + gap) * itemsPerView * pageIndex;
        
        categoryTrack.style.transform = `translateX(${moveAmount}px)`;
        
        // Dots'u güncelle
        document.querySelectorAll('.category-dot').forEach((dot, index) => {
            if (index === pageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Otomatik kaydırma
    setInterval(() => {
        currentPage = (currentPage + 1) % totalPages;
        goToPage(currentPage);
    }, 5000);
    
    // Responsive için window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            goToPage(0); // Reset to first page on resize
        }, 250);
    });
});
