const popupEls = [...document.querySelectorAll('.popup')];
const navItemEls = [...document.querySelectorAll('.nav_item')];
let lastSelectedPopupIndex;
let handlerPopupWrapper;

navItemEls.forEach((navItemEl, index) => {
    navItemEl.addEventListener('click', () => {
        if (lastSelectedPopupIndex === index) {
            popupEls[lastSelectedPopupIndex].classList.toggle('popup_active');
            navItemEls[lastSelectedPopupIndex].classList.toggle('select_nav_item');
            return;
        }

        if (lastSelectedPopupIndex !== undefined) {
            popupEls[lastSelectedPopupIndex].classList.remove('popup_active');
            navItemEls[lastSelectedPopupIndex].classList.remove('select_nav_item');
        }

        lastSelectedPopupIndex = index;

        popupEls[lastSelectedPopupIndex].classList.add('popup_active');
        navItemEls[lastSelectedPopupIndex].classList.add('select_nav_item');

        handlerPopupWrapper = e => handlerPopup(e);
        window.addEventListener('click', handlerPopupWrapper);
    });
});

const handlerPopup = e => {
    const path = e.composedPath();

    const isClickAway = path.every(el => {
        if (!el.classList) return true;

        return !el.classList.contains('popup') && !el.classList.contains('nav_item');
    });

    if (isClickAway) {
        popupEls[lastSelectedPopupIndex].classList.remove('popup_active');
        navItemEls[lastSelectedPopupIndex].classList.remove('select_nav_item');

        window.removeEventListener('click', handlerPopupWrapper);
    }
};

popupEls.forEach(popupEl => {
    const menuItemEls = [...popupEl.querySelectorAll('.menu_item')];
    const robotEls = [...popupEl.querySelectorAll('.robot')];
    let lastSelectedRobotIndex;

    menuItemEls.forEach((menuEl, index) => {
        menuEl.addEventListener('mouseenter', () => {
            if (lastSelectedRobotIndex === index) return;

            if (lastSelectedRobotIndex !== undefined) {
                robotEls[lastSelectedRobotIndex].classList.remove('robot_active');
            }

            lastSelectedRobotIndex = index;
            robotEls[index].classList.add('robot_active');
        });
    });
});