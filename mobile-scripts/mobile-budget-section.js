const mobileLowerNavigationBtnEl = document.querySelector('.mobile-lower-navigation-btn');
const mobileShowNavigationEls = [...document.querySelectorAll('.mobile-show-navigation')];
const mobileLowerNavigationEl = document.querySelector('.mobile-lower-navigation');

mobileLowerNavigationBtnEl.addEventListener('click', () => {

    mobileLowerNavigationEl.classList.toggle('mobile-lower-navigation-hidden');

    mobileShowNavigationEls.forEach(el => {
        el.classList.toggle('is-hidden');
    });
});


