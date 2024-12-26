const carouselItemEls = [...document.querySelectorAll('.carousel-item')];

const carouselItems = () => {
    carouselItemEls.forEach(item => {
        item.classList.toggle('carousel-item-hidden');
    });
};

let clearIntervalId = setInterval(() => {
    carouselItems();
}, 7000);

const restartInterval = () => {
    clearInterval(clearIntervalId);

    clearIntervalId = setInterval(() => {
        carouselItems();
    }, 7000);
};

const arrowEls = [...document.querySelectorAll('.icon-arrow')];

arrowEls.forEach(arrow => {
    arrow.addEventListener('click', () => {
        carouselItems();
        restartInterval();
    });
});

// DROPDOWN COUNTRY SELECTOR
const dropdownCountrySelectorEl = document.querySelector('.dropdown-country-selector');

document.addEventListener('click', e => {
    const dropdownMenu = e.target.closest('.dropdown-country-selector');

    if (e.target.classList.contains('nav-link-language')) {
        dropdownCountrySelectorEl.classList.toggle('country-selector-hidden');

    } else if (!dropdownMenu && !dropdownCountrySelectorEl.classList.contains('country-selector-hidden')) {
        dropdownCountrySelectorEl.classList.add('country-selector-hidden');
    }
});
