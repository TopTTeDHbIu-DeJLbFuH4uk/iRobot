const circlesVideosEls = document.querySelector('.pagination_circles_videos');
const videoCardsEls = [...document.querySelectorAll('.video_card')];
const sliderVideoTrackEl = document.querySelector('.slider_video_track');

// Переменные для работы со слайдами
let visibleSlidesVideoCount = 2;
let currentSlideVideoIndex = visibleSlidesVideoCount;

// Создание кружков пагинации в количестве слайдов
const paginationCirclesVideo = [];

const createPaginationCirclesVideos = () => {
    const li = document.createElement('li');
    li.className = 'pagination_circle';
    circlesVideosEls.appendChild(li);
    paginationCirclesVideo.push(li);
};

const addPaginationVideos = () => {
    videoCardsEls.forEach(createPaginationCirclesVideos);
    paginationCirclesVideo[0].classList.add('circle_active');
};
addPaginationVideos();

// Клонирование двух последних слайдов и добавление их перед основными
const lastTwoSlidesVideo = videoCardsEls.slice(-visibleSlidesVideoCount);
lastTwoSlidesVideo.forEach(slideVideoEl => {
   const clone = slideVideoEl.cloneNode(true);
   sliderVideoTrackEl.insertBefore(clone, videoCardsEls[0]);
});

// Клонирование двух первых слайдов и добавление их после основных
const firstTwoSlidesVideo = videoCardsEls.slice(0, visibleSlidesVideoCount);
firstTwoSlidesVideo.forEach(slideVideoEl => {
   const clone = slideVideoEl.cloneNode(true);
   sliderVideoTrackEl.appendChild(clone);
});

// Новый список слайдов (7)
const allSlidesVideo = [...document.querySelectorAll('.video_card')];

// Базовая ширина слайда
let slideVideoWidth = videoCardsEls[0].offsetWidth;

// Динамическое обновление ширины слайда при масштабировании
const updateSlideVideoWidth = () => {
    slideVideoWidth = allSlidesVideo[0].offsetWidth;
    updatePositionSliderVideos();
};
window.addEventListener('resize', updateSlideVideoWidth);

// Двигать трек со слайдами
const updatePositionSliderVideos = (index) => {

    if (index) {
        removeActiveClassPaginationVideos(currentSlideVideoIndex);
        currentSlideVideoIndex = index;
        addActiveClassPaginationVideos(currentSlideVideoIndex);
    }

    const offset = -currentSlideVideoIndex * slideVideoWidth;
    sliderVideoTrackEl.style.transform = `translate3d(${offset}px, 0px, 0px)`;
};

// Добавлять выделенный кружок пагинации текущему слайду
const addActiveClassPaginationVideos = (currentSlideIndexCircle) => {
    const normalizedIndex = (currentSlideIndexCircle - visibleSlidesVideoCount + paginationCirclesVideo.length) % paginationCirclesVideo.length;
    paginationCirclesVideo[normalizedIndex].classList.add('circle_active');
};

// Удалять выделенный кружок пагинации предыдущему слайду
const removeActiveClassPaginationVideos = (currentSlideIndexCircle) => {
    const normalizedIndex = (currentSlideIndexCircle - visibleSlidesVideoCount + paginationCirclesVideo.length) % paginationCirclesVideo.length;
    paginationCirclesVideo[normalizedIndex].classList.remove('circle_active');
};

// Навигация по кружкам пагинации
paginationCirclesVideo.forEach((circleVideoEl, index) => {
    circleVideoEl.addEventListener('click', () => updatePositionSliderVideos(index + visibleSlidesVideoCount));
});

// Инициализация начального положения слайдера с видео
updatePositionSliderVideos();