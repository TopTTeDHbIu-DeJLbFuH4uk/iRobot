const paginationCirclesContainerEl = document.querySelector('.pagination_circles_container');
const btnPrevPositionEl = document.querySelector('.btn_prev_position');
const btnNextPositionEl = document.querySelector('.btn_next_position');
const sliderRobotsTrackEl = document.querySelector('.slider_robots_track');
const sliderRobotWrapperEls = [...document.querySelectorAll('.slider_robot_wrapper')];

// Переменные для работы со слайдами
const visibleSlidesCount = 3;
let currentSlideIndex = visibleSlidesCount;
let isAnimating = false;

// Создание кружков пагинации в количестве слайдов
const paginationCircles = [];

const createPaginationCircles = () => {
    const li = document.createElement('li');
    li.className = 'pagination_circle';
    paginationCirclesContainerEl.appendChild(li);
    paginationCircles.push(li);
};

const addPagination = () => {
    sliderRobotWrapperEls.forEach(createPaginationCircles);
    paginationCircles[0].classList.add('circle_active');
};
addPagination();

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

// Динамическое обновление ширины слайда при масштабировании
const updateSlideWidth = () => {
    slideWidth = allSlides[0].offsetWidth;
    updateSliderPosition();
};
window.addEventListener('resize', updateSlideWidth);

// Двигать трэк со слайдами
const updateSliderPosition = (withTransition = true, index) => {

    if (index) {
        removeActiveClass(currentSlideIndex);
        currentSlideIndex = index;
        addActiveClass(currentSlideIndex);
    }

    const offset = -currentSlideIndex * slideWidth;

    sliderRobotsTrackEl.style.transition = withTransition ? 'transform .5s' : 'none';
    sliderRobotsTrackEl.style.transform = `translate3d(${offset}px, 0px, 0px)`;
};

// Навигация по кружкам пагинации
paginationCircles.forEach((circleEl, index) => {
    circleEl.addEventListener('click', () => {
        updateSliderPosition(true, index + visibleSlidesCount);
    });
});

// Добавлять выделенный кружок пагинации текущему слайду
const addActiveClass = (currentSlideIndexCircle) => {
    let normalizedIndex;

    if (currentSlideIndexCircle) {
        normalizedIndex = (currentSlideIndexCircle - visibleSlidesCount + paginationCircles.length) % paginationCircles.length;
    } else {
        normalizedIndex = (currentSlideIndex - visibleSlidesCount + paginationCircles.length) % paginationCircles.length;
    }

    paginationCircles[normalizedIndex].classList.add('circle_active');
};

// Удалять выделенный кружок пагинации предыдущему слайду
const removeActiveClass = (currentSlideIndexCircle) => {
    let normalizedIndex;

    if (currentSlideIndexCircle) {
        normalizedIndex = (currentSlideIndexCircle - visibleSlidesCount + paginationCircles.length) % paginationCircles.length;
    } else {
        normalizedIndex = (currentSlideIndex - visibleSlidesCount + paginationCircles.length) % paginationCircles.length;
    }
    paginationCircles[normalizedIndex].classList.remove('circle_active');
};

// Показать следующий слайд
const nextSlide = () => {
    // Блокировать клик до завершения анимации
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => {
        isAnimating = false;
    }, 500);

    removeActiveClass();

    currentSlideIndex++;
    updateSliderPosition();

    addActiveClass();

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
    // Блокировать клик до завершения анимации
    if (isAnimating) return;
    isAnimating = true;
    setTimeout(() => {
        isAnimating = false;
    }, 500);

    removeActiveClass();

    currentSlideIndex--;
    updateSliderPosition();

    addActiveClass();

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