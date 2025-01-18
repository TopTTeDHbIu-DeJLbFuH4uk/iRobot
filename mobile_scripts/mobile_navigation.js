const burgerMenuEl = document.querySelector('.burger_menu');
const closeMenuEl = document.querySelector('.close_menu');
const mobileMenuContainerEl = document.querySelector('.mobile_menu_container');

burgerMenuEl.addEventListener('click', () => {
    mobileMenuContainerEl.style.transform = 'translateX(0)';
});

closeMenuEl.addEventListener('click', () => {
    console.log('Закрытие меню');
    // mobileMenuContainerEl.style.backgroundColor = 'red'; // Работает
    mobileMenuContainerEl.style.transform = 'translateX(-100%)';
});


























const mobileSelectedLanguageEl = document.querySelector('.mobile_selected_language');
const listOfLanguagesEl = document.querySelector('.list_of_languages');

mobileSelectedLanguageEl.addEventListener('click', () => {
    listOfLanguagesEl.classList.toggle('hidden');
});