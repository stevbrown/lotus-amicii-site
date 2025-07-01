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
});


function scrollToElement(targetSelector) {
    const targetDiv = document.querySelector(targetSelector);
    if (targetDiv) {
        targetDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}
