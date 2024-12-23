const heroVideoEl = document.querySelector('.hero-video');
const playersEls = [...document.querySelectorAll('.controller-video-button > img')];
const controllerVideoButtonEl = document.querySelector('.controller-video-button');

document.addEventListener('click', e => handlerVideo(e));

const handlerVideo = e => {

    const controllerVideoButton = e.target.closest('.controller-video-button');
    const video = e.target.closest('.hero-video');
    const videoOverlay = e.target.closest('.video-overlay');

    const selection = window.getSelection();

    if (selection.toString().length > 0) {
        return;
    }

    if (controllerVideoButton) {
        controllerVideoButton.classList.add('is-active');
    }
    if (!controllerVideoButton) {
        controllerVideoButtonEl.classList.remove('is-active');
    }

    if (controllerVideoButton || video || videoOverlay) {


        if (heroVideoEl.paused) {
            heroVideoEl.play();

            playersEls[0].classList.remove('inactive');
            playersEls[1].classList.add('inactive');

        } else {
            heroVideoEl.pause();

            playersEls[0].classList.add('inactive');
            playersEls[1].classList.remove('inactive');
        }
    }
};

