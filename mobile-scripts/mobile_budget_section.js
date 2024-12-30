const showProductsBtnEl = document.querySelector('.show_products_btn');
const toggleEls = [...document.querySelectorAll('.toggle')];
const mobileProductContainerEl = document.querySelector('.mobile_product_container');

showProductsBtnEl.addEventListener('click', () => {

    mobileProductContainerEl.classList.toggle('hidden');

    toggleEls.forEach(toggleEl => {
        toggleEl.classList.toggle('hidden');
    });
});


