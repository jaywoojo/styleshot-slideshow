// Get elements
const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');

let currentSlide = 0;

// Generate dot indicators
slides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) {
        dot.classList.add('active');
    }
    dot.dataset.index = index;
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Function to show the active slide
function showSlide(index) {
    // Wrap index within bounds
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }

    // Scroll to the target slide
    slidesContainer.scrollTo({
        left: slides[index].offsetLeft,
        behavior: 'smooth',
    });

    // Update active states
    slides.forEach((slide, i) => slide.classList.remove('active'));
    dots.forEach((dot, i) => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

// Button Event Listeners
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
prevButton.addEventListener('click', () => showSlide(currentSlide - 1));

// Keyboard Event Listener
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
    } else if (event.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
    }
});

// Touch/Swipe Handling
let startX = 0;
let endX = 0;

slidesContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;

    if (startX > endX + 50) {
        showSlide(currentSlide + 1); // Swipe left
    } else if (startX < endX - 50) {
        showSlide(currentSlide - 1); // Swipe right
    }
});

// Dot Click Event Listener
dots.forEach((dot) => {
    dot.addEventListener('click', () => showSlide(parseInt(dot.dataset.index)));
});

// Function to update active dot based on scroll position
function updateActiveDot() {
    const slideWidth = slides[0].offsetWidth;
    const scrollPosition = slidesContainer.scrollLeft;
    const index = Math.round(scrollPosition / slideWidth);

    // Update active states
    slides.forEach((slide, i) => slide.classList.remove('active'));
    dots.forEach((dot, i) => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
}

// Scroll Event Listener to update active dot
slidesContainer.addEventListener('scroll', updateActiveDot);

// Initial update on load
updateActiveDot();
