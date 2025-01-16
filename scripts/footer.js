const btnSignUpEl = document.querySelector('.btn_sign_up');
const newsletterInputEl = document.querySelector('.newsletter_input');
const validationMessageEl = document.querySelector('.validation_message');

btnSignUpEl.addEventListener('click', () => {
    const inputValue = newsletterInputEl.value;
    onInput(inputValue);
});
newsletterInputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const inputValue = newsletterInputEl.value;
        onInput(inputValue);
    }
});

const onInput = inputValue => {
    if (!inputValue) {
        validationMessageEl.classList.add('hidden');
        return;
    }

    const pattern = /^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (pattern.test(inputValue)) {
        validationMessageEl.classList.add('hidden');
    } else {
        validationMessageEl.classList.remove('hidden');
    }
};

const scrollUpEl = document.querySelector('.scroll_up');
const headerEl = document.querySelector('.header');

scrollUpEl.addEventListener('click', () => {
    headerEl.scrollIntoView({
       behavior: "smooth",
    });
});