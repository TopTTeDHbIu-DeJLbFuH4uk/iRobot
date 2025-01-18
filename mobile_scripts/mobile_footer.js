const btnOpenNavEls = [...document.querySelectorAll('.btn_open_nav')];
const expandCollapseArrowEls = [...document.querySelectorAll('.expand_collapse_arrow')];
const mobileFooterMenuEls = [...document.querySelectorAll('.mobile_footer_menu')];

let selectedFooterNavWrappers = [];
let lastSelectedFooterNav;

btnOpenNavEls.forEach((btnOpenEl, index) => {
    btnOpenEl.addEventListener('click', () => {

        if (lastSelectedFooterNav !== undefined) btnOpenNavEls[lastSelectedFooterNav].classList.remove('is_active');
        lastSelectedFooterNav = index;

        mobileFooterMenuEls[index].classList.toggle('hidden');
        expandCollapseArrowEls[index].classList.toggle('expand');
        btnOpenNavEls[index].classList.add('is_active');

        if (selectedFooterNavWrappers[index]) window.removeEventListener('click', selectedFooterNavWrappers[index]);

        selectedFooterNavWrappers[index] = e => removeHighlightSelectedNav(e, index);
        window.addEventListener('click', selectedFooterNavWrappers[index]);
    });
});

const removeHighlightSelectedNav = (e, index) => {

    const path = e.composedPath();

    const isClickAway = path.some(el => {
        if (!el.classList) return false;

        return el.classList.contains('is_active');
    });

    if (!isClickAway) {
        btnOpenNavEls[index].classList.remove('is_active');
        window.removeEventListener('click', selectedFooterNavWrappers[index]);
    }
};