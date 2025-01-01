const videoEls = [...document.querySelectorAll('.video')];
const playPauseBtnEls = [...document.querySelectorAll('.play_pause_btn')];
const playEls = [...document.querySelectorAll('.play')];
const pauseEls = [...document.querySelectorAll('.pause')];
let lastClickIndex;

playPauseBtnEls.forEach((playPauseEl, index) => {
    playPauseEl.addEventListener('click', e => {
        lastClickIndex = index;
        handlerVideo(e, lastClickIndex);
    });
});

videoEls.forEach((videoEl, index) => {
   videoEl.addEventListener('click', e => {
       lastClickIndex = index;
       handlerVideo(e, lastClickIndex, videoEl);
   });
});

const handlerVideo = (e, lastClickIndex, videoEl) => {
    const path = e.composedPath();

    const isClickVideo = path.some(el => {
        if (!el.classList) return;

        return el.classList.contains('video') || el.classList.contains('play_pause_btn');
    });

    if (lastClickIndex || lastClickIndex === 0) {
        playPauseBtnEls[lastClickIndex].classList.add('play_pause_outline');
    }

    if (isClickVideo) {

        if (videoEls[lastClickIndex].paused) {
            videoEls[lastClickIndex].play();

            playEls[lastClickIndex].classList.remove('hidden');
            pauseEls[lastClickIndex].classList.add('hidden');

        } else {
            videoEls[lastClickIndex].pause();

            playEls[lastClickIndex].classList.add('hidden');
            pauseEls[lastClickIndex].classList.remove('hidden');
        }
    }

    if (path.includes(videoEl)) {
        playPauseBtnEls[lastClickIndex].classList.remove('play_pause_outline');
    }
};