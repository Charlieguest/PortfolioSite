const track = document.querySelector('.carousel-list');
let slides = Array.from(track.children);
const nextButton = document.querySelector('.button-right');
const prevButton = document.querySelector('.button-left');
const carouselNav = document.querySelector('.carousel-nav');
const carouselDots = Array.from(carouselNav.children);

let slideSize = slides[0].getBoundingClientRect();
let slideWidth = slideSize.width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + (index * 32) + "px";
}

slides.forEach(setSlidePosition);


const adjustSlides = () => {
    slides = Array.from(track.children);
    slideSize = slides[0].getBoundingClientRect();
    slideWidth = slideSize.width;
    slides.forEach(setSlidePosition);
    console.log("happens");
}

window.addEventListener('resize', adjustSlides);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

//when i click right move to right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    // moving dot accordingly
    const currentDot = carouselNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;

    //no slide? loop to the first.
    if (!nextSlide) {
        nextSlide = slides[0];
        nextDot = carouselDots[0];
    }

    updateDots(currentDot, nextDot);
    moveToSlide(track, currentSlide, nextSlide);
})

//When i click left move to left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    // moving dot accordingly
    const currentDot = carouselNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;

    //no slide? loop to the last.
    if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
        prevDot = carouselDots[carouselDots.length - 1];

    }

    updateDots(currentDot, prevDot);
    moveToSlide(track, currentSlide, prevSlide);
})

//when i click nav indicators move to that slide
carouselNav.addEventListener('click', e => {

    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-slide');

    const targetIndex = carouselDots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);
})