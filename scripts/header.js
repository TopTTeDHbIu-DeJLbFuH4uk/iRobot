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
const languageSelection = document.querySelector('.language_selection');
const languageSelectionOptionEl = document.querySelector('.language_selection_option');

let handlerDropDownMenuWrapper;

languageSelection.addEventListener('click', () => {
    languageSelectionOptionEl.classList.toggle('hidden');

    handlerDropDownMenuWrapper = e => handlerDropDownMenu(e);

    window.addEventListener('click', handlerDropDownMenuWrapper);
});

languageSelectionOptionEl.addEventListener('click', e => {
    e.stopPropagation();
});

const handlerDropDownMenu = e => {
    const path = e.composedPath();

    const isClickAway = path.every(el => {
        if (!el.classList) return true;
        return !el.classList.contains('language_selection_option') && !el.classList.contains('language_selection');
    });

    if (isClickAway) {
        languageSelectionOptionEl.classList.add('hidden');

        window.removeEventListener('click', handlerDropDownMenuWrapper);
    }
};