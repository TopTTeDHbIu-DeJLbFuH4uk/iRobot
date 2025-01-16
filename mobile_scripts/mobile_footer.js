const btnOpenNavEls = [...document.querySelectorAll('.btn_open_nav')];
const expandCollapseArrowEls = [...document.querySelectorAll('.expand_collapse_arrow')];
const mobileFooterMenuEls = [...document.querySelectorAll('.mobile_footer_menu')];


btnOpenNavEls.forEach((btnOpenEl, index) => {
    btnOpenEl.addEventListener('click', () => {
        openFooterMenu(index);
    });
});

const openFooterMenu = index => {
    const lastClickIndex = index;

};