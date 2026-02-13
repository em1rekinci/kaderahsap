// Kategori Slider
let categoryPosition = 0;
const categoryTrack = document.querySelector('.category-track');
const categoryItems = document.querySelectorAll('.category-item');
const categoryDotsContainer = document.querySelector('.category-dots');

if (categoryTrack && categoryItems.length > 0) {
    const itemsPerView = window.innerWidth > 768 ? 5 : 2;
    const totalPages = Math.ceil(categoryItems.length / itemsPerView);
    
    // Dots oluştur
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('category-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goCategoryPage(i));
        categoryDotsContainer.appendChild(dot);
    }
    
    function goCategoryPage(page) {
        categoryPosition = page;
        const itemWidth = categoryItems[0].offsetWidth;
        const gap = 40;
        const moveAmount = -(itemWidth + gap) * itemsPerView * page;
        
        categoryTrack.style.transform = `translateX(${moveAmount}px)`;
        
        // Dots güncelle
        document.querySelectorAll('.category-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === page);
        });
    }
    
    // Otomatik slider
    setInterval(() => {
        categoryPosition = (categoryPosition + 1) % totalPages;
        goCategoryPage(categoryPosition);
    }, 4000);
}
