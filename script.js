// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.mobile-menu');
    
    mobileNav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Special handling for menu items stagger
            if (entry.target.classList.contains('menu-grid') && entry.target.classList.contains('active')) {
                const items = entry.target.querySelectorAll('.menu-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.section-header, .about-text, .about-image, .contact-form, .contact-detail').forEach(el => {
    observer.observe(el);
});

// Menu Tab Switching
function switchTab(category) {
    // Update tabs
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update content
    document.querySelectorAll('.menu-grid').forEach(grid => {
        grid.classList.remove('active');
    });
    
    const activeGrid = document.getElementById(category);
    activeGrid.classList.add('active');
    
    // Animate items
    const items = activeGrid.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
        item.classList.remove('visible');
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
    });
}

// Initialize menu items observer
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('active')) {
            const items = entry.target.querySelectorAll('.menu-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-grid').forEach(grid => {
    menuObserver.observe(grid);
});

// Reviews Slider
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');
const dots = document.querySelectorAll('.review-dot');

function updateReview(index) {
    reviews.forEach(review => review.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    reviews[index].classList.add('active');
    dots[index].classList.add('active');
    currentReview = index;
}

function changeReview(direction) {
    let newIndex = currentReview + direction;
    if (newIndex < 0) newIndex = reviews.length - 1;
    if (newIndex >= reviews.length) newIndex = 0;
    updateReview(newIndex);
}

function goToReview(index) {
    updateReview(index);
}

// Auto-rotate reviews
setInterval(() => {
    changeReview(1);
}, 6000);

// Form Submission
function handleSubmit(e) {
    e.preventDefault();
    
    const btn = e.target.querySelector('.submit-btn');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending...';
    btn.style.background = 'var(--gold-light)';
    
    setTimeout(() => {
        btn.textContent = 'Reservation Requested!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'var(--gold)';
            e.target.reset();
        }, 3000);
    }, 1500);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});