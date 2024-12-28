const popupEls = [...document.querySelectorAll('.popup')];
const navItemEls = [...document.querySelectorAll('.nav_item')];
let lastSelectedPopupIndex;

navItemEls.forEach((itemEl, index) => {
    itemEl.addEventListener('click', () => {

        if (lastSelectedPopupIndex === index) {
            popupEls[lastSelectedPopupIndex].classList.remove('popup_active');
            lastSelectedPopupIndex = undefined;
            return;
        }

        if (lastSelectedPopupIndex !== undefined) {
            popupEls[lastSelectedPopupIndex].classList.remove('popup_active');
        }

        lastSelectedPopupIndex = index;
        popupEls[index].classList.add('popup_active');
    });
});

window.addEventListener('click', e => {

    const popup = e.target.closest('.popup');
    const navItem = e.target.closest('.nav_item');

    if (!popup && !navItem)  {
        popupEls[lastSelectedPopupIndex].classList.remove('popup_active');
    }
});




const menuItemEls = [...document.querySelectorAll('.menu_item')];
const robotEls = [...document.querySelectorAll('.robot')];
const robotActive = 'robot_active';
let lastSelectedRobotIndex;

menuItemEls.forEach((menuEl, index) => {
    menuEl.addEventListener('mouseenter', () => {
        if (lastSelectedRobotIndex === index) return;

        if (lastSelectedRobotIndex !== undefined) {
            robotEls[lastSelectedRobotIndex].classList.remove(robotActive);
        }

        lastSelectedRobotIndex = index;
        robotEls[index].classList.add(robotActive);
    });
});
