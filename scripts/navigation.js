const navItemEls = [...document.querySelectorAll('.nav-item')];
const containerPopupMenuEls = [...document.querySelectorAll('.container-popup-menu')];

document.addEventListener('click', e => showMenu(e));

const showMenu = e => {
    const containerDropdownMenuShop = e.target.closest('.container-popup-menu');
    const navItem = e.target.closest('.nav-item');

    if (!navItem && !containerDropdownMenuShop) {
        containerPopupMenuEls.forEach(menu => menu.classList.add('container-popup-menu-hidden'));
        navItemEls.forEach(item => item.classList.remove('select-nav-item'));
        return;
    }

    if (navItem) {
        const dataNavItemId = navItem.dataset.navItem;

        navItemEls.forEach(item => {
            if (item === navItem) {
                item.classList.toggle('select-nav-item');
            } else {
                item.classList.remove('select-nav-item');
            }
        });

        containerPopupMenuEls.forEach(menu => {
            if (menu.getAttribute('data-dropdown-menu') === dataNavItemId) {
                menu.classList.toggle('container-popup-menu-hidden');
            } else {
                menu.classList.add('container-popup-menu-hidden');
            }
        });
    }
};

const menuCategoryEls = [...document.querySelectorAll('.menu-link')];
const robotCategoryShopEls = [...document.querySelectorAll('.robot-image')];

menuCategoryEls.forEach(menu => {
    menu.addEventListener('mousemove', () => {

        const dataMenuId = menu.dataset.menu;

        robotCategoryShopEls.forEach(robot => {

            if (dataMenuId === robot.getAttribute('data-robot')) {
                robot.classList.remove('robot-hidden');

            } else if (dataMenuId !== robot.getAttribute('data-robot')) {
                robot.classList.add('robot-hidden');
            }
        });
    });
});