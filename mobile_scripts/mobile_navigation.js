const burgerMenuEl = document.querySelector('.burger_menu');
const closeMenuEl = document.querySelector('.close_menu');
const dropDownMenuEl = document.querySelector('.drop_down_menu');

burgerMenuEl.addEventListener('click', () => {
    dropDownMenuEl.style.transform = 'translateX(0)';
    document.body.classList.add('scroll_hidden');
});

closeMenuEl.addEventListener('click', () => {
    dropDownMenuEl.style.transform = 'translateX(-100%)';
    document.body.classList.remove('scroll_hidden');
});

const mobileNavItemEls = [...document.querySelectorAll('.mobile_nav_item')];
const menuItemContainerEls = [...document.querySelectorAll('.menu_item_container')];
const btnBackEl = document.querySelector('.btn_back');

// btnBackEl.addEventListener('click', () => {
//     menuItemContainerEl.style.transform = `translateX(490px)`;
//     btnBackEl.classList.remove('visibility');
// });

const openMobileMenu = itemMenu => {



    itemMenu.addEventListener('click', () => {
        btnBackEl.classList.add('visibility');
        menuItemContainerEl.style.transform = 'translateX(0)';
    });

};
mobileNavItemEls.forEach(openMobileMenu);









const mobileSelectedLanguageEl = document.querySelector('.mobile_selected_language');
const listOfLanguagesEl = document.querySelector('.list_of_languages');

mobileSelectedLanguageEl.addEventListener('click', () => {
    listOfLanguagesEl.classList.toggle('hidden');
});