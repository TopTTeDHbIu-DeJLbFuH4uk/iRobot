const navItemEls = [...document.querySelectorAll('.nav-item')];
const containerDropdownMenuShopEls = [...document.querySelectorAll('.container-dropdown-menu-shop')];

navItemEls.forEach(item => {
    item.addEventListener('click', () => {
        showMenu(item);
    });
});

const showMenu = (item) => {

    const dataNavItemId = item.dataset.navItem;

    containerDropdownMenuShopEls.forEach(menu => {

        if (dataNavItemId === menu.getAttribute('data-dropdown-menu')) {
            menu.classList.toggle('container-dropdown-menu-shop-hidden');

        } else if (dataNavItemId !== menu.getAttribute('data-dropdown-menu')) {
            menu.classList.add('container-dropdown-menu-shop-hidden');
        }

    });

};

// document.addEventListener('click', e => {
//     const containerDropdownMenu = e.target.closest('.container-dropdown-menu-shop');
//
//     if (!containerDropdownMenu && !)
// });

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