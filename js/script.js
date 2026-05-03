document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPLASH SCREEN (Hanya jalan di index.html) ---
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) { // KODE PENGAMAN: Cek apakah ada splash screen di halaman ini
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

    // --- 3. FADE IN ANIMATION (Untuk teks muncul pelan-pelan) ---
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

    // --- 4. GALLERY CAROUSEL (Hanya jalan di gallery.html) ---
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const track = container.querySelector('.carousel-track');
        const images = track.querySelectorAll('img');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        let currentIndex = 0;

        const updateCarousel = () => {
            if (images.length > 0) {
                const imgWidth = images[0].clientWidth;
                track.style.transform = `translateX(-${currentIndex * imgWidth}px)`;
            }
        };

        // KODE PENGAMAN: Pastikan tombolnya ada sebelum dikasih event click
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const visibleImages = window.innerWidth <= 900 ? 1 : 3;
                const maxIndex = images.length - visibleImages;
                
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0; 
                }
                updateCarousel();
            });

            prevBtn.addEventListener('click', () => {
                const visibleImages = window.innerWidth <= 900 ? 1 : 3;
                const maxIndex = images.length - visibleImages;

                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = maxIndex; 
                }
                updateCarousel();
            });
        }

        window.addEventListener('resize', updateCarousel);
    });

});