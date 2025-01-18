const renderSlides = () => {
    const sliderRobotWrapperEl = document.querySelector('.slider_robots_track > template');
    const sliderShoppingWrapperEl = document.querySelector('.slider_shopping_track > template');
    const sliderMarketingWrapperEl = document.querySelector('.slider_marketing_track > template');

    robotSlidesData.forEach(slideEl => {
        const slideElement = sliderRobotWrapperEl.content.cloneNode(true);

        slideElement.querySelector('img').src = slideEl.imgSrc;
        slideElement.querySelector('img').alt = slideEl.alt;
        slideElement.querySelector('img').title = slideEl.title;
        slideElement.querySelector('h3').textContent = slideEl.quote;
        slideElement.querySelector('.slide_description').textContent = slideEl.description;
        slideElement.querySelector('.slide_action').textContent = slideEl.actionText;
        slideElement.querySelector('.slide_action').href = slideEl.actionLink;

        sliderRobotWrapperEl.parentElement.append(slideElement);
    });

    shoppingSlidesData.forEach(slideEl => {
        const slideElement = sliderShoppingWrapperEl.content.cloneNode(true);

        slideElement.querySelector('img').src = slideEl.imgSrc;
        slideElement.querySelector('img').alt = slideEl.alt;

        if (slideEl.link) {
            const linkElement = document.createElement('a');

            linkElement.href = slideEl.link;
            linkElement.append(slideElement.querySelector('img'));

            slideElement.querySelector('.slider_shopping_wrapper').append(linkElement);
        }
        sliderShoppingWrapperEl.parentElement.append(slideElement);
    });

    marketingSlidesData.forEach(slideEl => {
        const slideElement = sliderMarketingWrapperEl.content.cloneNode(true);
        slideElement.querySelector('img').src = slideEl.imgSrc;
        slideElement.querySelector('img').alt = slideEl.alt;
        sliderMarketingWrapperEl.parentElement.append(slideElement);
    });

    getRenderSlides();
};

const updateSliderPosition = ({
                                  withTransition = true,
                                  currentSlideIndex,
                                  sliderTrackEl,
                                  slideWidth,
                                  index,
                                  sliderPaginationEl,
                                  visibleSlidesCount
                              }) => {

    if (index) {
        removeActiveClass({sliderPaginationEl});
        currentSlideIndex.value = index;
        addActiveClass({sliderPaginationEl, index, visibleSlidesCount});
    }

    const offset = currentSlideIndex.value * slideWidth;

    sliderTrackEl.style.transition = withTransition ? 'transform .5s' : 'none';
    sliderTrackEl.style.transform = `translateX(${-offset}px)`;
};

const configureSlider = ({
                             slidesEls,
                             sliderPaginationEl,
                             sliderTrackEl,
                             sliderNavNextEl,
                             sliderNavPrevEl,
                             visibleSlidesCount,
                             sliderTrackEls
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
        sliderPaginationEl.append(li);
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
                sliderPaginationEl,
                visibleSlidesCount
            });
        });
    });

    if (sliderNavNextEl && sliderNavPrevEl) {
        sliderNavNextEl.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            nextSlide({
                currentSlideIndex,
                sliderTrackEl,
                slideWidth,
                slidesEls,
                sliderPaginationEl,
                visibleSlidesCount
            });

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });

        sliderNavPrevEl.addEventListener('click', () => {
            if (isAnimating) return;
            isAnimating = true;

            prevSlide({
                currentSlideIndex,
                sliderTrackEl,
                slideWidth,
                slidesEls,
                sliderPaginationEl,
                visibleSlidesCount
            });

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        });
    }
// ===================================================
//         СВАЙПЫ НА СЕНСОРЕ И ЛИСТАНИЕ МЫШЬЮ
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

        isDragging = true;

        startX = e.touches ? e.touches[0].clientX : e.clientX;
        currentX = startX;

        sliderTrackEl.style.transition = 'none';
    };

    const moveDrag = e => {
        if (!isDragging) return;

        currentX = e.touches ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;

        if (Math.abs(diff) > 5) {
            hasMoved = true;
        }

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
                    sliderPaginationEl,
                    visibleSlidesCount
                });
            } else {
                prevSlide({
                    currentSlideIndex,
                    sliderTrackEl,
                    slideWidth,
                    slidesEls,
                    sliderPaginationEl,
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
            hasMoved = false;
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

const addActiveClass = ({sliderPaginationEl, index, visibleSlidesCount}) => {
    const circlesEls = sliderPaginationEl.querySelectorAll('.pagination_circle');
    const normalizedIndex = (index - visibleSlidesCount + circlesEls.length) % circlesEls.length;

    circlesEls[normalizedIndex].classList.add('circle_active');
};

const removeActiveClass = ({sliderPaginationEl}) => {
    const circlesEls = sliderPaginationEl.querySelectorAll('.pagination_circle');
    circlesEls.forEach(circleEl => circleEl.classList.remove('circle_active'));
};

const nextSlide = ({
                       currentSlideIndex,
                       sliderTrackEl,
                       slideWidth,
                       slidesEls,
                       sliderPaginationEl,
                       visibleSlidesCount
                   }) => {

    removeActiveClass({sliderPaginationEl});
    currentSlideIndex.value++;
    addActiveClass({sliderPaginationEl, index: currentSlideIndex.value, visibleSlidesCount});

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
                       sliderPaginationEl,
                       visibleSlidesCount
                   }) => {

    removeActiveClass({sliderPaginationEl});
    currentSlideIndex.value--;
    addActiveClass({sliderPaginationEl, index: currentSlideIndex.value, visibleSlidesCount});

    updateSliderPosition({withTransition: true, currentSlideIndex, sliderTrackEl, slideWidth});

    if (currentSlideIndex.value === 0) {
        setTimeout(() => {
            currentSlideIndex.value = slidesEls.length - visibleSlidesCount * 2;
            updateSliderPosition({withTransition: false, currentSlideIndex, sliderTrackEl, slideWidth});
        }, 500);
    }
};

const getRenderSlides = () => {
    const videoCardsEls = [...document.querySelectorAll('.video_card')];
    const sliderRobotWrapperEls = [...document.querySelectorAll('.slider_robot_wrapper')];
    const sliderShoppingWrapperEls = [...document.querySelectorAll('.slider_shopping_wrapper')];
    const sliderMarketingWrapperEls = [...document.querySelectorAll('.slider_marketing_wrapper')];

    const sliderNavPrevEls = [...document.querySelectorAll('.slider_nav_prev')];
    const sliderNavNextEls = [...document.querySelectorAll('.slider_nav_next')];

    const sliderTrackEls = [...document.querySelectorAll('.slider_track')];

    const sliderPaginationEls = [...document.querySelectorAll('.slider_pagination')];

    configureSlider({
        slidesEls: videoCardsEls,
        sliderPaginationEl: sliderPaginationEls[0],
        sliderTrackEl: sliderTrackEls[0],
        visibleSlidesCount: 2,
        sliderTrackEls: sliderTrackEls,
    });
    configureSlider({
        slidesEls: sliderRobotWrapperEls,
        sliderPaginationEl: sliderPaginationEls[1],
        sliderTrackEl: sliderTrackEls[1],
        sliderNavNextEl: sliderNavNextEls[0],
        sliderNavPrevEl: sliderNavPrevEls[0],
        visibleSlidesCount: 3,
        sliderTrackEls: sliderTrackEls,
    });
    configureSlider({
        slidesEls: sliderShoppingWrapperEls,
        sliderPaginationEl: sliderPaginationEls[2],
        sliderTrackEl: sliderTrackEls[2],
        sliderNavNextEl: sliderNavNextEls[1],
        sliderNavPrevEl: sliderNavPrevEls[1],
        visibleSlidesCount: 4,
        sliderTrackEls: sliderTrackEls,
    });
    configureSlider({
        slidesEls: sliderMarketingWrapperEls,
        sliderPaginationEl: sliderPaginationEls[3],
        sliderTrackEl: sliderTrackEls[3],
        sliderNavNextEl: sliderNavNextEls[2],
        sliderNavPrevEl: sliderNavPrevEls[2],
        visibleSlidesCount: 1,
        sliderTrackEls: sliderTrackEls,
    });
};