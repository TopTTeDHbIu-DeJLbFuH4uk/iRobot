const circlesRobotsEl = document.querySelector('.circles_robots');
const btnPrevPositionEl = document.querySelector('.btn_prev_position');
const btnNextPositionEl = document.querySelector('.btn_next_position');
const sliderRobotsTrackEl = document.querySelector('.slider_robots_track');
const sliderRobotWrapperEls = [...document.querySelectorAll('.slider_robot_wrapper')];

// Переменные для работы со слайдами
const visibleSlidesRobotCount = 3;
let currentSlideRobotIndex = visibleSlidesRobotCount;
let isAnimatingSliderRobots = false;

// Создание кружков пагинации в количестве слайдов
const paginationCirclesRobots = [];

const createPaginationCirclesRobots = () => {
    const li = document.createElement('li');
    li.className = 'pagination_circle';
    circlesRobotsEl.appendChild(li);
    paginationCirclesRobots.push(li);
};

const addPaginationRobots = () => {
    sliderRobotWrapperEls.forEach(createPaginationCirclesRobots);
    paginationCirclesRobots[0].classList.add('circle_active');
};
addPaginationRobots();

// Клонирование последних трёх слайдов и добавление их перед основными
const lastThreeSlides = sliderRobotWrapperEls.slice(0, visibleSlidesRobotCount);
lastThreeSlides.forEach(slideEl => {
    const clone = slideEl.cloneNode(true);
    sliderRobotsTrackEl.append(clone);
});

// Клонирование первых трёх слайдов и добавление их после основых
const firstThreeSlides = sliderRobotWrapperEls.slice(-visibleSlidesRobotCount);
firstThreeSlides.forEach(slideEl => {
    const clone = slideEl.cloneNode(true);
    sliderRobotsTrackEl.insertBefore(clone, sliderRobotWrapperEls[0]);
});

// Новый список слайдов (12)
const allSlidesRobot = [...document.querySelectorAll('.slider_robot_wrapper')];

// Базовая ширина слайда
let slideRobotWidth = sliderRobotWrapperEls[0].offsetWidth;

// Динамическое обновление ширины слайда при масштабировании
const updateSlideRobotWidth = () => {
    slideRobotWidth = allSlidesRobot[0].offsetWidth;
    updateSliderRobotsPosition();
};
window.addEventListener('resize', updateSlideRobotWidth);

// Двигать трэк со слайдами
const updateSliderRobotsPosition = (withTransition = true, index) => {

    if (index) {
        removeActiveClass(currentSlideRobotIndex);
        currentSlideRobotIndex = index;
        addActiveClass(currentSlideRobotIndex);
    }

    const offset = -currentSlideRobotIndex * slideRobotWidth;

    sliderRobotsTrackEl.style.transition = withTransition ? 'transform .5s' : 'none';
    sliderRobotsTrackEl.style.transform = `translate3d(${offset}px, 0px, 0px)`;
};

// Навигация по кружкам пагинации
paginationCirclesRobots.forEach((circleEl, index) => {
    circleEl.addEventListener('click', () => {
        updateSliderRobotsPosition(true, index + visibleSlidesRobotCount);
    });
});

// Добавлять выделенный кружок пагинации текущему слайду
const addActiveClass = (currentSlideIndexCircle) => {
    let normalizedIndex;

    if (currentSlideIndexCircle) {
        normalizedIndex = (currentSlideIndexCircle - visibleSlidesRobotCount + paginationCirclesRobots.length) % paginationCirclesRobots.length;
    } else {
        normalizedIndex = (currentSlideRobotIndex - visibleSlidesRobotCount + paginationCirclesRobots.length) % paginationCirclesRobots.length;
    }

    paginationCirclesRobots[normalizedIndex].classList.add('circle_active');
};

// Удалять выделенный кружок пагинации предыдущему слайду
const removeActiveClass = (currentSlideIndexCircle) => {
    let normalizedIndex;

    if (currentSlideIndexCircle) {
        normalizedIndex = (currentSlideIndexCircle - visibleSlidesRobotCount + paginationCirclesRobots.length) % paginationCirclesRobots.length;
    } else {
        normalizedIndex = (currentSlideRobotIndex - visibleSlidesRobotCount + paginationCirclesRobots.length) % paginationCirclesRobots.length;
    }
    paginationCirclesRobots[normalizedIndex].classList.remove('circle_active');
};

// Показать следующий слайд
const nextSlide = () => {
    // Блокировать клик до завершения анимации
    if (isAnimatingSliderRobots) return;
    isAnimatingSliderRobots = true;
    setTimeout(() => {
        isAnimatingSliderRobots = false;
    }, 500);

    removeActiveClass();

    currentSlideRobotIndex++;
    updateSliderRobotsPosition();

    addActiveClass();

    // Быстрая перемотка назад при достижении последнего клона
    if (currentSlideRobotIndex === allSlidesRobot.length - visibleSlidesRobotCount) {
        setTimeout(() => {
            currentSlideRobotIndex = visibleSlidesRobotCount;
            updateSliderRobotsPosition(false);

        }, 500);
    }
};

// Показать предыдущий слайд
const prevSlide = () => {
    // Блокировать клик до завершения анимации
    if (isAnimatingSliderRobots) return;
    isAnimatingSliderRobots = true;
    setTimeout(() => {
        isAnimatingSliderRobots = false;
    }, 500);

    removeActiveClass();

    currentSlideRobotIndex--;
    updateSliderRobotsPosition();

    addActiveClass();

    // Быстрая перемотка назад при достижении последнего клона
    if (currentSlideRobotIndex === 0) {
        setTimeout(() => {
            currentSlideRobotIndex = allSlidesRobot.length - visibleSlidesRobotCount * 2;
            updateSliderRobotsPosition(false);

        }, 500);
    }
};

// Обработчики на кнопках
btnNextPositionEl.addEventListener('click', nextSlide);
btnPrevPositionEl.addEventListener('click', prevSlide);

// Инициализация начального положения слайдера
updateSliderRobotsPosition(false);