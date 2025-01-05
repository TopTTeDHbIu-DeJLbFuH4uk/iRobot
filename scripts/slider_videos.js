const circlesVideosEls = document.querySelector('.pagination_circles_videos');
const videoCardsEls = [...document.querySelectorAll('.video_card')];


const paginationCirclesVideos = [];

const createPaginationCirclesVideos = () => {
    const li = document.createElement('li');
    li.className = 'pagination_circle';
    circlesVideosEls.appendChild(li);
    paginationCirclesVideos.push(li);
};

const addPaginationVideos = () => {
    videoCardsEls.forEach(createPaginationCirclesVideos);
    paginationCirclesVideos[0].classList.add('circle_active');
}
addPaginationVideos();