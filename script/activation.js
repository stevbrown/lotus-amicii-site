document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    if (!header || !hero) return;

    function updateHeroHeight() {
        const headerHeight = header.clientHeight;
        
        if (headerHeight === 0) {
            requestAnimationFrame(updateHeroHeight);
            return;
        }
        
        hero.style.height = `calc(100vh - ${headerHeight}px)`;
    }

    setTimeout(() => {
        document.body.classList.add("loaded");
        window.scrollTo(0, 0);
    }, 100);

    updateHeroHeight();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateHeroHeight, 100);
    });

    const carousel = document.querySelector(".carousel");

    // Дублируем содержимое один раз
    const originalItems = Array.from(carousel.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });

    let scrollSpeed = 1; // скорость в пикселях
    let animationFrameId;

    function autoScroll() {
        carousel.scrollLeft += scrollSpeed;

        // Если достигли середины (конец оригинального контента), обнуляем
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
            carousel.scrollLeft = 0;
        }

        animationFrameId = requestAnimationFrame(autoScroll);
    }

    autoScroll();
});


function scrollToElement(targetSelector) {
    const targetDiv = document.querySelector(targetSelector);
    if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
