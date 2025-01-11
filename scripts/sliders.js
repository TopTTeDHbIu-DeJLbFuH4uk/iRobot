const videoCardsEls = [...document.querySelectorAll('.video_card')];
const sliderRobotWrapperEls = [...document.querySelectorAll('.slider_robot_wrapper')];
const sliderShoppingWrapperEls = [...document.querySelectorAll('.slider_shopping_wrapper')];

const buttonPrevEls = [...document.querySelectorAll('.button_prev')];
const buttonNextEls = [...document.querySelectorAll('.button_next')];

const sliderTrackEls = [...document.querySelectorAll('.slider_track')];

const paginationCirclesEls = [...document.querySelectorAll('.pagination_circles')];

// Двигать трек со слайдами
const updateSliderPosition = (withTransition = true, currentSlideIndex, sliderTrack, slideWidth, index, paginationCirclesContainer, visibleSlidesCount) => {

    if (index) {
        removeActiveClass(paginationCirclesContainer);
        currentSlideIndex.value = index;
        addActiveClass(paginationCirclesContainer, index, visibleSlidesCount);
    }

    const offset = -currentSlideIndex.value * slideWidth;

    sliderTrack.style.transition = withTransition ? 'transform .5s' : 'none';
    sliderTrack.style.transform = `translateX(${offset}px)`;
};

const sozdatPostranichnieKrugi = ({
                                      slides,
                                      paginationCirclesContainer,
                                      sliderTrack,
                                      buttonNext,
                                      buttonPrev,
                                      visibleSlidesCount
                                  }) => {
    const currentSlideIndex = {value: visibleSlidesCount};
    const paginationCircles = [];
    let isAnimating = false;

    // Клонирование последних и первых слайдов
    const lastSlides = slides.slice(-currentSlideIndex.value);
    lastSlides.forEach(slideEl => {
        const clone = slideEl.cloneNode(true);
        sliderTrack.insertBefore(clone, slides[0]);
    });
    const firstSlides = slides.slice(0, currentSlideIndex.value);
    firstSlides.forEach(slideEl => {
        const clone = slideEl.cloneNode(true);
        sliderTrack.append(clone);
    });

    // Базовая ширина слайда
    let slideWidth = slides[0].offsetWidth;

    // Функция пересчёта ширины при изменении размеров экрана
    const updateSlideWidth = () => {
        slideWidth = slides[0].offsetWidth;
        updateSliderPosition(false, currentSlideIndex, sliderTrack, slideWidth);
    };
    window.addEventListener('resize', updateSlideWidth);
    updateSlideWidth();

    // Создать и отрисовать кружки пагинации
    slides.forEach(() => {
        const li = document.createElement('li');
        li.className = 'pagination_circle';
        paginationCircles.push(li);
        paginationCirclesContainer.append(li);
    });
    paginationCircles[0].classList.add('circle_active');

    // Переопределяем slides с учётом клонов
    slides = [...sliderTrack.querySelectorAll('.slide')];

    // Обработчик клика по кружкам
    paginationCircles.forEach((circleEl, index) => {
        circleEl.addEventListener('click', () => {
            // При клике на индекс index хотим перейти на реальный индекс,
            // учитывающий offset
            const realIndex = index + visibleSlidesCount;
            updateSliderPosition(true, currentSlideIndex, sliderTrack, slideWidth, realIndex, paginationCirclesContainer, visibleSlidesCount);
        });
    });

    // Если есть кнопки "вперёд" и "назад" — привязываем события
    if (buttonNext && buttonPrev) {
        buttonNext.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            nextSlide(currentSlideIndex, sliderTrack, slideWidth, slides, paginationCirclesContainer, visibleSlidesCount);

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });

        buttonPrev.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            prevSlide(currentSlideIndex, sliderTrack, slideWidth, slides, paginationCirclesContainer, visibleSlidesCount);

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });
    }
    // ===================================================
    //            СВАЙПЫ НА СЕНСОРЕ/КУРСОРОМ
    // ===================================================
    let startX = 0;
    let currentX = 0;
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let hasCrossedThreshold = false;
    let offsetAtThreshold = 0;
    const swipeThreshold = 50;

    const startDrag = e => {
        if (isAnimating) return;
        isAnimating = true;

        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        // currentX = startX;
        // startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        // currentY = startY;

        isDragging = true;
        hasCrossedThreshold = false;
        sliderTrack.style.transition = 'none';
    };

    const moveDrag = e => {
        if (!isDragging) return;

        currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        // currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const diffX = currentX - startX;
        // const diffY = currentY - startY;



        if (!hasCrossedThreshold && Math.abs(diffX) > swipeThreshold) {
            hasCrossedThreshold = true;
            offsetAtThreshold = diffX;
        }

        if (hasCrossedThreshold) {
            // document.body.style.overflowY = 'hidden';
            e.preventDefault();

            const offset = -currentSlideIndex.value * slideWidth + (diffX - offsetAtThreshold);
            sliderTrack.style.transform = `translateX(${offset}px)`;
        }
    };

    const endDrag = () => {
        if (!isDragging) return;

        const diff = currentX - startX;
        isDragging = false;

        // document.body.style.overflowY = 'scroll';
        sliderTrack.style.transition = 'transform 0.5s';

        if (Math.abs(diff) > swipeThreshold) {
            if (diff < 0) {
                nextSlide(currentSlideIndex, sliderTrack, slideWidth, slides, paginationCirclesContainer, visibleSlidesCount);
            } else {
                prevSlide(currentSlideIndex, sliderTrack, slideWidth, slides, paginationCirclesContainer, visibleSlidesCount);
            }
        } else {
            updateSliderPosition(true, currentSlideIndex, sliderTrack, slideWidth);
        }

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    const addDragEvents = sliderTrack => {
        sliderTrack.addEventListener('touchstart', startDrag, { passive: false });
        sliderTrack.addEventListener('mousedown', startDrag, { passive: false });

        sliderTrack.addEventListener('touchmove', moveDrag, { passive: false });
        sliderTrack.addEventListener('mousemove', moveDrag, { passive: false });

        sliderTrack.addEventListener('touchend', endDrag, { passive: true });
        sliderTrack.addEventListener('mouseup', endDrag, { passive: true });

        sliderTrack.addEventListener('mouseleave', endDrag, { passive: true });
    };
    addDragEvents(sliderTrack);

};

// Выделять текущий кружок пагинации, который соответствует слайду
const addActiveClass = (paginationCirclesContainer, index, visibleSlidesCount) => {
    const circlesEls = paginationCirclesContainer.querySelectorAll('.pagination_circle');

    const normalizedIndex = (index - visibleSlidesCount + circlesEls.length) % circlesEls.length;

    circlesEls[normalizedIndex].classList.add('circle_active');
};

// Удалять предыдущий кружок пагинации, который соответствовал предыдущему слайду
const removeActiveClass = (paginationCirclesContainer) => {
    const circlesEls = paginationCirclesContainer.querySelectorAll('.pagination_circle');
    circlesEls.forEach(circleEl => circleEl.classList.remove('circle_active'));
};

// Показать следующий слайд
const nextSlide = (currentSlideIndex, sliderTrack, slideWidth, slides, paginationCirclesContainer, visibleSlidesCount) => {

    removeActiveClass(paginationCirclesContainer);
    currentSlideIndex.value++;
    addActiveClass(paginationCirclesContainer, currentSlideIndex.value, visibleSlidesCount);

    updateSliderPosition(true, currentSlideIndex, sliderTrack, slideWidth);

    if (currentSlideIndex.value === slides.length - visibleSlidesCount) {
        setTimeout(() => {
            currentSlideIndex.value = visibleSlidesCount;
            updateSliderPosition(false, currentSlideIndex, sliderTrack, slideWidth);
        }, 500);
    }
};

// Показать предыдущий слайд
const prevSlide = (currentSlideIndex, sliderTrack, slideWidth, slides, paginationCirclesContainer, visibleSlidesCount) => {

    removeActiveClass(paginationCirclesContainer);
    currentSlideIndex.value--;
    addActiveClass(paginationCirclesContainer, currentSlideIndex.value, visibleSlidesCount);

    updateSliderPosition(true, currentSlideIndex, sliderTrack, slideWidth);

    if (currentSlideIndex.value === 0) {
        setTimeout(() => {
            currentSlideIndex.value = slides.length - visibleSlidesCount * 2;
            updateSliderPosition(false, currentSlideIndex, sliderTrack, slideWidth);
        }, 500);
    }
};

sozdatPostranichnieKrugi({
    slides: videoCardsEls,
    paginationCirclesContainer: paginationCirclesEls[0],
    sliderTrack: sliderTrackEls[0],
    visibleSlidesCount: 2,
});
sozdatPostranichnieKrugi({
    slides: sliderRobotWrapperEls,
    paginationCirclesContainer: paginationCirclesEls[1],
    sliderTrack: sliderTrackEls[1],
    buttonNext: buttonNextEls[0],
    buttonPrev: buttonPrevEls[0],
    visibleSlidesCount: 3,
});
sozdatPostranichnieKrugi({
    slides: sliderShoppingWrapperEls,
    paginationCirclesContainer: paginationCirclesEls[2],
    sliderTrack: sliderTrackEls[2],
    buttonNext: buttonNextEls[1],
    buttonPrev: buttonPrevEls[1],
    visibleSlidesCount: 4,
});