const sliderItemEls = [...document.querySelectorAll('.slider_item')];

const carouselItems = () => {
    sliderItemEls.forEach(el => {
        el.classList.toggle('slider_item_active');
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

const arrowEls = [...document.querySelectorAll('.arrow')];

arrowEls.forEach(arrow => {
    arrow.addEventListener('click', () => {
        carouselItems();
        restartInterval();
    });
});

// DROPDOWN MENU
const dropdownMenuEl = document.querySelector('.language_selection_option');

document.addEventListener('click', e => {
    const dropdownMenu = e.target.closest('.language_selection_option');

    if (e.target.classList.contains('selected_language') || e.target.classList.contains('current_language')) {
        dropdownMenuEl.classList.toggle('list_active');

    } else if (!dropdownMenu && dropdownMenuEl.classList.contains('list_active')) {
        dropdownMenuEl.classList.remove('list_active');
    }
});
