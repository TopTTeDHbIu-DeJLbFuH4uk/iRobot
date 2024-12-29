const playPauseBtnEl = document.querySelector('.play_pause_btn');
const videoEl = document.querySelector('.video');
const videoContentEl = document.querySelector('.video_content');
const playEl = document.querySelector('.play');
const pauseEl = document.querySelector('.pause');
const shopBtnEls = [...document.querySelectorAll('.shop_btn')];

playPauseBtnEl.addEventListener('click', e => handlerVideo(e));

videoContentEl.addEventListener('click', e => handlerVideo(e));

const handlerVideo = (e) => {
    const path = e.composedPath();

    const isClickBtnShop = path.some(el => {return shopBtnEls.includes(el)});

    if (isClickBtnShop) return;

    if (path.includes(playPauseBtnEl)) {
        playPauseBtnEl.classList.add('play_pause_outline');
    }

    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        return;
    }

    if (videoEl.paused) {
        videoEl.play();

        playEl.classList.remove('hidden');
        pauseEl.classList.add('hidden');

        if (path.includes(videoContentEl)) {
            playPauseBtnEl.classList.remove('play_pause_outline');
        }

    } else {
        videoEl.pause();

        playEl.classList.add('hidden');
        pauseEl.classList.remove('hidden');

        if (path.includes(videoContentEl)) {
            playPauseBtnEl.classList.remove('play_pause_outline');
        }
    }
};