// Banner Slider Functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');

    let currentSlide = 0;
    let slideInterval;
    let isAnimating = false;

    // Initialize the slider
    function initSlider() {
        // Set the first slide as active
        showSlide(currentSlide);

        // Start automatic sliding
        startSlideInterval();

        // Add event listeners
        prevBtn.addEventListener('click', function () {
            if (!isAnimating) {
                prevSlide();
            }
        });

        nextBtn.addEventListener('click', function () {
            if (!isAnimating) {
                nextSlide();
            }
        });

        // Add event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (!isAnimating && currentSlide !== index) {
                    currentSlide = index;
                    showSlide(currentSlide);
                }
            });
        });

        // Pause automatic sliding on hover
        const bannerContainer = document.querySelector('.banner-container');
        bannerContainer.addEventListener('mouseenter', stopSlideInterval);
        bannerContainer.addEventListener('mouseleave', startSlideInterval);

        // Add keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                if (!isAnimating) {
                    prevSlide();
                }
            } else if (e.key === 'ArrowRight') {
                if (!isAnimating) {
                    nextSlide();
                }
            }
        });

        // Add swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;

        bannerContainer.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        bannerContainer.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            if (!isAnimating) {
                if (touchEndX < touchStartX - 50) {
                    // Swipe left
                    nextSlide();
                } else if (touchEndX > touchStartX + 50) {
                    // Swipe right
                    prevSlide();
                }
            }
        }
    }

    // Show a specific slide
    function showSlide(index) {
        isAnimating = true;

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Reset animation after transition
        setTimeout(() => {
            isAnimating = false;
        }, 800); // Match this with the CSS transition time
    }

    // Go to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Go to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Start automatic sliding
    function startSlideInterval() {
        slideInterval = setInterval(function () {
            if (!isAnimating) {
                nextSlide();
            }
        }, 6000); // Change slide every 6 seconds
    }

    // Stop automatic sliding
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Initialize the slider
    initSlider();
});

// Product hover effect enhancement
document.addEventListener('DOMContentLoaded', function () {
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Toggle sidebar
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('active');
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue',
                data: [3500, 4200, 3800, 5100, 4800, 5800, 6300, 5400, 6200, 7100, 6800, 7500],
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderColor: '#3498db',
                borderWidth: 2,
                pointBackgroundColor: '#3498db',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 4],
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Clothing', 'Furniture', 'Books', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#f39c12',
                    '#e74c3c',
                    '#9b59b6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });

    // Chart Actions
    const chartActions = document.querySelectorAll('.chart-action');
    chartActions.forEach(action => {
        action.addEventListener('click', function () {
            // Remove active class from all buttons
            chartActions.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
});