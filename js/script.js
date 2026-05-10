document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPLASH SCREEN ---
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) { 
        setTimeout(() => {
            splashScreen.classList.add('hide-splash');
        }, 2500); 
    }

    // --- 2. NAVBAR SCROLL EFFECT ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. FADE IN ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 
    });

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 4. GALLERY CAROUSEL (DENGAN FITUR SWIPE) ---
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const images = track.querySelectorAll('img');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        let currentIndex = 0;

        const updateCarousel = () => {
            if (images.length > 0) {
                const imgWidth = images[0].getBoundingClientRect().width;
                track.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
            }
        };

        const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const visibleImages = isMobile() ? 1 : 3;
                const maxIndex = images.length - visibleImages;
                
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0; 
                }
                updateCarousel();
            });

            prevBtn.addEventListener('click', () => {
                const visibleImages = isMobile() ? 1 : 3;
                const maxIndex = images.length - visibleImages;

                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = maxIndex; 
                }
                updateCarousel();
            });
        }

        // --- FITUR TOUCH & SWIPE UNTUK MOBILE ---
        let startX = 0;
        let isDragging = false;

        // Pastikan track ada sebelum dikasih event
        if (track) {
            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            }, { passive: true });

            track.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const currentX = e.touches[0].clientX;
                const diff = startX - currentX;
                
                if (diff > 50) { 
                    if(nextBtn) nextBtn.click(); 
                    isDragging = false;
                } else if (diff < -50) {
                    if(prevBtn) prevBtn.click(); 
                    isDragging = false;
                }
            }, { passive: true });

            track.addEventListener('touchend', () => {
                isDragging = false;
            });
        }

        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });
    });

});

// --- 5. AJAX FETCH DATA DIRI (Untuk Contact Page) ---
const aboutContainer = document.getElementById('about-data');

if (aboutContainer) {
    // Memulai Fetch (AJAX)
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Memasukkan data ke dalam HTML secara dinamis
            aboutContainer.innerHTML = `
                <div class="data-item">
                    <span class="data-label">Name</span>
                    <span class="data-value">${data.name}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Major</span>
                    <span class="data-value">${data.major}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Interests</span>
                    <span class="data-value">${data.interest}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Bio</span>
                    <span class="data-value">${data.bio}</span>
                </div>
                <p class="about-quote">${data.quote}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            aboutContainer.innerHTML = '<p>Failed to load profile.</p>';
        });
}