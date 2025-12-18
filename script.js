// Product images array - automatically populated from img/products folder
const productImages = [
    'img/products/caleb-chibi.avif',
    'img/products/caleb-colonel.avif',
    'img/products/caleb-x02.avif',
    'img/products/rafayel-chibi.png',
    'img/products/rafayel-clothes.avif',
    'img/products/rafayel-plushie.avif',
    'img/products/rafayel-siren-clothes.avif',
    'img/products/sylus-chibi.avif',
    'img/products/sylus-dragon.png',
    'img/products/sylus-ob11.avif',
    'img/products/sylus-plushie.png',
    'img/products/white-mephisto.avif',
    'img/products/xavier-chibi.avif',
    'img/products/xavier-clothes.avif',
    'img/products/xavier-dark-lumiere.avif',
    'img/products/xavier-wedding-suit.avif',
    'img/products/zayne-bandage.avif',
    'img/products/zayne-birthday.avif',
    'img/products/zayne-chibi.avif'
];

// Slideshow configuration
const SLIDESHOW_INTERVAL = 4000; // 4 seconds per image
let currentIndex = 0;
let slideshowInterval = null;

// Get slideshow elements (two images for crossfade)
const slideshowImage1 = document.getElementById('slideshow-image-1');
const slideshowImage2 = document.getElementById('slideshow-image-2');
const slideshowImages = [slideshowImage1, slideshowImage2];
let activeImageIndex = 0; // which of the two <img> elements is currently visible

// Preload images for smooth transitions
function preloadImages() {
    productImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize slideshow
function initSlideshow() {
    if (productImages.length === 0) {
        console.warn('No product images found');
        slideshowImage1.src = 'img/shop-logo-1.JPG'; // Fallback to logo if no images
        slideshowImage1.alt = 'CandyDollShop';
        slideshowImage1.classList.add('active');
        return;
    }

    // Preload all images
    preloadImages();

    // Pick a random starting image so each visit can begin differently
    const initialIndex = Math.floor(Math.random() * productImages.length);
    currentIndex = initialIndex;

    // Set initial image on the first <img>
    slideshowImage1.src = productImages[initialIndex];
    slideshowImage1.alt = `Product ${initialIndex + 1}`;
    slideshowImage1.classList.add('active');
    slideshowImage2.classList.remove('active');
    currentIndex = 0;
    activeImageIndex = 0;

    // Start auto-play
    startSlideshow();
}

// Show image at specific index
function showImage(index) {
    if (productImages.length === 0) return;

    // Ensure index is within bounds
    currentIndex = index % productImages.length;
    if (currentIndex < 0) {
        currentIndex = productImages.length - 1;
    }

    // Determine current and next <img> elements
    const currentImgEl = slideshowImages[activeImageIndex];
    const nextImgEl = slideshowImages[1 - activeImageIndex];

    // Prepare next image
    nextImgEl.src = productImages[currentIndex];
    nextImgEl.alt = `Product ${currentIndex + 1}`;

    // Crossfade: fade out current, fade in next
    currentImgEl.classList.remove('active');
    nextImgEl.classList.add('active');

    // Swap active index
    activeImageIndex = 1 - activeImageIndex;
}

// Start auto-playing slideshow
function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }

    slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % productImages.length;
        showImage(currentIndex);
    }, SLIDESHOW_INTERVAL);
}

// Stop slideshow (useful for pause on hover if needed)
function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// Handle image load errors for both elements
slideshowImages.forEach(imgEl => {
    imgEl.addEventListener('error', function() {
        console.error('Failed to load image:', this.src);
        // Skip to next image if current fails
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % productImages.length;
            showImage(currentIndex);
        }, 1000);
    });
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlideshow);
} else {
    initSlideshow();
}

// Optional: Pause slideshow on hover (uncomment if desired)
// const tvBox = document.querySelector('.tv-box');
// tvBox.addEventListener('mouseenter', stopSlideshow);
// tvBox.addEventListener('mouseleave', startSlideshow);

