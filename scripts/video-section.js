const playersEls = [...document.querySelectorAll('.control-btn > img')];
const heroVideoEl = document.querySelector('.hero-video');
const controlBtnEl = document.querySelector('.control-btn');

document.addEventListener('click', e => handlerVideo(e));

const handlerVideo = e => {

    const controllerVideoButton = e.target.closest('.control-btn');
    const videoOverlay = e.target.closest('.video-overlay');

    const selection = window.getSelection();

    if (selection.toString().length > 0) {
        return;
    }

    if (controllerVideoButton) {
        controllerVideoButton.classList.add('is-active');
    }
    if (!controllerVideoButton) {
        controlBtnEl.classList.remove('is-active');
    }

    if (controllerVideoButton || videoOverlay) {

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

const videosEls = [...document.querySelectorAll('.video-card > video')];

videosEls.forEach(video => {
    video.addEventListener('click', e => {

        const video = e.target.closest('video');
        const videoId = video.dataset.video;

        if (videoId === video.getAttribute('data-video')) {

            if (video.paused) {
                video.play();

            } else {
                video.pause();
            }
        }

    });
})
