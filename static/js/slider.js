document.addEventListener("DOMContentLoaded", () => {

    let index = 0;
    const slides = document.querySelector(".slides");
    const slideItems = document.querySelectorAll(".slide");
    const total = slideItems.length;
    const dotsContainer = document.querySelector(".dots");

    if (!slides || total === 0) return;

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
        document.querySelectorAll(".dot").forEach((d, i) => {
            d.classList.toggle("active", i === index);
        });
    }

    function nextSlide() {
        index = (index + 1) % total;
        updateSlide();
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        updateSlide();
    }

    // okları globale aç (HTML onclick için)
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    // dots
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dot.addEventListener("click", () => {
            index = i;
            updateSlide();
        });
        dotsContainer.appendChild(dot);
    }

    updateSlide();
    setInterval(nextSlide, 5000);
});
