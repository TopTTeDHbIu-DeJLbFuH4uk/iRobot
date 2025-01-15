const updateVideoEls = () => {
    const videoEls = [...document.querySelectorAll('.video')];
    const playPauseBtnEls = [...document.querySelectorAll('.play_pause_btn')];
    const playEls = [...document.querySelectorAll('.play')];
    const pauseEls = [...document.querySelectorAll('.pause')];
    let lastClickIndex;

    videoEls.forEach((videoEl, index) => {
        videoEl.addEventListener('click', e => {
            lastClickIndex = index;
            handlerVideo(e, lastClickIndex, videoEl, playPauseBtnEls, playEls, pauseEls);
        });
    });

    playPauseBtnEls.forEach((playPauseEl, index) => {
        playPauseEl.addEventListener('click', e => {
            lastClickIndex = index;
            handlerVideo(e, lastClickIndex, videoEls[index], playPauseBtnEls, playEls, pauseEls);
        });
    });
};

const handlerVideo = (e, lastClickIndex, videoEl, playPauseBtnEls, playEls, pauseEls) => {
    const path = e.composedPath();
    const isClickVideo = path.some(el => {
        return el.classList.contains('video') || el.classList.contains('play_pause_btn');
    });

    if (lastClickIndex !== undefined) {
        playPauseBtnEls[lastClickIndex].classList.add('play_pause_outline');
    }

    if (isClickVideo) {
        if (videoEl.paused) {
            videoEl.play();

            playEls[lastClickIndex].classList.add('hidden');
            pauseEls[lastClickIndex].classList.remove('hidden');
        } else {
            videoEl.pause();

            playEls[lastClickIndex].classList.remove('hidden');
            pauseEls[lastClickIndex].classList.add('hidden');
        }
    }

    if (path.includes(videoEl)) {
        playPauseBtnEls[lastClickIndex].classList.remove('play_pause_outline');
    }
};