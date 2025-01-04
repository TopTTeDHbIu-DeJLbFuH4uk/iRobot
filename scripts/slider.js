const btnPrevPositionEl = document.querySelector('.btn_prev_position');
const btnNextPositionEl = document.querySelector('.btn_next_position');
const sliderRobotsTrackEl = document.querySelector('.slider_robots_track');
const sliderRobotWrapperEls = [...document.querySelectorAll('.slider_robot_wrapper')];

let currentSlideIndex = 0;
const visibleSlidesCount = 3;
let isAnimating = false;

// Базовая ширина слайда
let slideWidth = sliderRobotWrapperEls[0].offsetWidth;

// Клонирование первых трёх слайдов
const lastThreeSlides = sliderRobotWrapperEls.slice(0, visibleSlidesCount);
lastThreeSlides.forEach(slideEl => {
    const clone = slideEl.cloneNode(true);
    sliderRobotsTrackEl.append(clone);
});

// Клонирование последних трёх слайдов
const firstThreeSlides = sliderRobotWrapperEls.slice(-visibleSlidesCount);
firstThreeSlides.forEach(slideEl => {
    const clone = slideEl.cloneNode(true);
    sliderRobotsTrackEl.insertBefore(clone, sliderRobotWrapperEls[0]);
});

// Новый список слайдов (12)
const allSlides = [...document.querySelectorAll('.slider_robot_wrapper')];
currentSlideIndex = visibleSlidesCount;

// Динамическое обновление ширины при масштабировании
const updateSlideWidth = () => {
    slideWidth = allSlides[0].offsetWidth;
    updateSliderPosition();
};
window.addEventListener('resize', updateSlideWidth);

// Двигать трэк со слайдами
const updateSliderPosition = (withTransition = true) => {
    const offset = -currentSlideIndex * slideWidth;

    sliderRobotsTrackEl.style.transition = withTransition ? 'transform .5s ease-in-out' : 'none';
    sliderRobotsTrackEl.style.transform = `translateX(${offset}px)`;
};

// Показать следующий слайд
const nextSlide = () => {
    // Блокировка спама кликами
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => {
        isAnimating = false;
    }, 500);

    currentSlideIndex++;
    updateSliderPosition();

    // Быстрая перемотка назад при достижении последнего клона
    if (currentSlideIndex === allSlides.length - visibleSlidesCount) {
        setTimeout(() => {
            currentSlideIndex = visibleSlidesCount;
            updateSliderPosition(false);

        }, 500);
    }
};

// Показать предыдущий слайд
const prevSlide = () => {
    // Блокировка спама кликами
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => {
        isAnimating = false;
    }, 500);

    currentSlideIndex--;
    updateSliderPosition();

    // Быстрая перемотка назад при достижении последнего клона
    if (currentSlideIndex === 0) {
        setTimeout(() => {
            currentSlideIndex = allSlides.length - visibleSlidesCount * 2;
            updateSliderPosition(false);

        }, 500);
    }
};

// Обработчики на кнопках
btnNextPositionEl.addEventListener('click', nextSlide);
btnPrevPositionEl.addEventListener('click', prevSlide);

// Инициализация начального положения слайдера
updateSliderPosition(false);
