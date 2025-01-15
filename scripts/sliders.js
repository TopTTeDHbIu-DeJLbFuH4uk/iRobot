const videoCardsEls = [...document.querySelectorAll('.video_card')];
const sliderRobotWrapperEls = [...document.querySelectorAll('.slider_robot_wrapper')];
const sliderShoppingWrapperEls = [...document.querySelectorAll('.slider_shopping_wrapper')];

const buttonPrevEls = [...document.querySelectorAll('.button_prev')];
const buttonNextEls = [...document.querySelectorAll('.button_next')];

const sliderTrackEls = [...document.querySelectorAll('.slider_track')];

const paginationCirclesEls = [...document.querySelectorAll('.pagination_circles')];

const updateSliderPosition = ({
                                  withTransition = true,
                                  currentSlideIndex,
                                  sliderTrackEl,
                                  slideWidth,
                                  index,
                                  paginationCirclesContainerEl,
                                  visibleSlidesCount
                              }) => {

    if (index) {
        removeActiveClass({paginationCirclesContainerEl});
        currentSlideIndex.value = index;
        addActiveClass({paginationCirclesContainerEl, index, visibleSlidesCount});
    }

    const offset = currentSlideIndex.value * slideWidth;

    sliderTrackEl.style.transition = withTransition ? 'transform .5s' : 'none';
    sliderTrackEl.style.transform = `translateX(${-offset}px)`;
};

const configureSlider = ({
                             slidesEls,
                             paginationCirclesContainerEl,
                             sliderTrackEl,
                             buttonNextEl,
                             buttonPrevEl,
                             visibleSlidesCount
                         }) => {
    const currentSlideIndex = {value: visibleSlidesCount};

    let isAnimating = false;

    const lastSlides = slidesEls.slice(-currentSlideIndex.value);
    lastSlides.forEach(slideEl => {
        const clone = slideEl.cloneNode(true);
        sliderTrackEl.insertBefore(clone, slidesEls[0]);
    });

    const firstSlides = slidesEls.slice(0, currentSlideIndex.value);
    firstSlides.forEach(slideEl => {
        const clone = slideEl.cloneNode(true);
        sliderTrackEl.append(clone);
    });

    let slideWidth = slidesEls[0].offsetWidth;

    const updateSlideWidth = () => {
        slideWidth = slidesEls[0].offsetWidth;
        updateSliderPosition({withTransition: false, currentSlideIndex, sliderTrackEl, slideWidth});
    };
    window.addEventListener('resize', updateSlideWidth);
    updateSlideWidth();

    const paginationCircles = slidesEls.map(() => {
        const li = document.createElement('li');
        li.classList.add('pagination_circle');
        paginationCirclesContainerEl.append(li);
        return li;
    });
    paginationCircles[0].classList.add('circle_active');

    slidesEls = [...sliderTrackEl.querySelectorAll('.slide')];

    const newListVideo = slidesEls.some(slideEl => {
        return slideEl.classList.contains('video_card');
    });
    if (newListVideo) {
        updateVideoEls();
    }

    paginationCircles.forEach((circleEl, index) => {
        circleEl.addEventListener('click', () => {
            const realIndex = index + visibleSlidesCount;
            updateSliderPosition({
                withTransition: true,
                currentSlideIndex,
                sliderTrackEl,
                slideWidth,
                index: realIndex,
                paginationCirclesContainerEl,
                visibleSlidesCount
            });
        });
    });

    if (buttonNextEl && buttonPrevEl) {
        buttonNextEl.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            nextSlide({
                currentSlideIndex,
                sliderTrackEl,
                slideWidth,
                slidesEls,
                paginationCirclesContainerEl,
                visibleSlidesCount
            });

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });

        buttonPrevEl.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            prevSlide({
                currentSlideIndex,
                sliderTrackEl,
                slideWidth,
                slidesEls,
                paginationCirclesContainerEl,
                visibleSlidesCount
            });

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });
    }
// ===================================================
//            СВАЙПЫ НА СЕНСОРЕ И МЫШЬЮ
// ===================================================
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;

    const swipeThreshold = 50;
    const minScreenWidthForSwipe = 1024;

    const startDrag = e => {
        if (isAnimating) return;
        isAnimating = true;

        const isVideoSlider = sliderTrackEl === sliderTrackEls[0];
        if (isVideoSlider && window.innerWidth >= minScreenWidthForSwipe) return;

        e.preventDefault();

        isDragging = true;

        startX = e.touches ? e.touches[0].clientX : e.clientX;
        currentX = startX;

        sliderTrackEl.style.transition = 'none';
    };

    const moveDrag = e => {
        if (!isDragging) return;

        e.preventDefault();

        hasMoved = true;

        currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;

        const offset = currentSlideIndex.value * slideWidth;

        sliderTrackEl.style.transform = `translateX(${-offset + diff}px)`;
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;

        const diff = currentX - startX;

        sliderTrackEl.style.transition = 'transform 0.5s';

        if (Math.abs(diff) > swipeThreshold) {
            if (diff < 0) {
                nextSlide({
                    currentSlideIndex,
                    sliderTrackEl,
                    slideWidth,
                    slidesEls,
                    paginationCirclesContainerEl,
                    visibleSlidesCount
                });
            } else {
                prevSlide({
                    currentSlideIndex,
                    sliderTrackEl,
                    slideWidth,
                    slidesEls,
                    paginationCirclesContainerEl,
                    visibleSlidesCount
                });
            }
        } else {
            updateSliderPosition({
                withTransition: true,
                currentSlideIndex,
                sliderTrackEl,
                slideWidth
            });
        }
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    };

    const preventClick = e => {
        if (hasMoved) {
            e.preventDefault();
            hasMoved = false;
        }
    };

    const addDragEvents = sliderTrackEl => {
        sliderTrackEl.addEventListener('pointerdown', startDrag);
        sliderTrackEl.addEventListener('pointermove', moveDrag);

        sliderTrackEl.addEventListener('pointerup', endDrag);
        sliderTrackEl.addEventListener('pointercancel', endDrag);
        sliderTrackEl.addEventListener('pointerleave', endDrag);

        sliderTrackEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', preventClick);
        });
    };
    addDragEvents(sliderTrackEl);
};

const addActiveClass = ({paginationCirclesContainerEl, index, visibleSlidesCount}) => {
    const circlesEls = paginationCirclesContainerEl.querySelectorAll('.pagination_circle');
    const normalizedIndex = (index - visibleSlidesCount + circlesEls.length) % circlesEls.length;

    circlesEls[normalizedIndex].classList.add('circle_active');
};

const removeActiveClass = ({paginationCirclesContainerEl}) => {
    const circlesEls = paginationCirclesContainerEl.querySelectorAll('.pagination_circle');
    circlesEls.forEach(circleEl => circleEl.classList.remove('circle_active'));
};

const nextSlide = ({
                       currentSlideIndex,
                       sliderTrackEl,
                       slideWidth,
                       slidesEls,
                       paginationCirclesContainerEl,
                       visibleSlidesCount
                   }) => {

    removeActiveClass({paginationCirclesContainerEl});
    currentSlideIndex.value++;
    addActiveClass({paginationCirclesContainerEl, index: currentSlideIndex.value, visibleSlidesCount});

    updateSliderPosition({withTransition: true, currentSlideIndex, sliderTrackEl, slideWidth});

    if (currentSlideIndex.value === slidesEls.length - visibleSlidesCount) {
        setTimeout(() => {
            currentSlideIndex.value = visibleSlidesCount;
            updateSliderPosition({withTransition: false, currentSlideIndex, sliderTrackEl, slideWidth});
        }, 500);
    }
};

const prevSlide = ({
                       currentSlideIndex,
                       sliderTrackEl,
                       slideWidth,
                       slidesEls,
                       paginationCirclesContainerEl,
                       visibleSlidesCount
                   }) => {

    removeActiveClass({paginationCirclesContainerEl});
    currentSlideIndex.value--;
    addActiveClass({paginationCirclesContainerEl, index: currentSlideIndex.value, visibleSlidesCount});

    updateSliderPosition({withTransition: true, currentSlideIndex, sliderTrackEl, slideWidth});

    if (currentSlideIndex.value === 0) {
        setTimeout(() => {
            currentSlideIndex.value = slidesEls.length - visibleSlidesCount * 2;
            updateSliderPosition({withTransition: false, currentSlideIndex, sliderTrackEl, slideWidth});
        }, 500);
    }
};

configureSlider({
    slidesEls: videoCardsEls,
    paginationCirclesContainerEl: paginationCirclesEls[0],
    sliderTrackEl: sliderTrackEls[0],
    visibleSlidesCount: 2,
});
configureSlider({
    slidesEls: sliderRobotWrapperEls,
    paginationCirclesContainerEl: paginationCirclesEls[1],
    sliderTrackEl: sliderTrackEls[1],
    buttonNextEl: buttonNextEls[0],
    buttonPrevEl: buttonPrevEls[0],
    visibleSlidesCount: 3,
});
configureSlider({
    slidesEls: sliderShoppingWrapperEls,
    paginationCirclesContainerEl: paginationCirclesEls[2],
    sliderTrackEl: sliderTrackEls[2],
    buttonNextEl: buttonNextEls[1],
    buttonPrevEl: buttonPrevEls[1],
    visibleSlidesCount: 4,
});