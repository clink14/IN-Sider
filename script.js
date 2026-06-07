const cursor = document.querySelector('.cursor');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, input, .user-menu, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '28px';  
            cursor.style.height = '28px'; 
            cursor.style.backgroundColor = 'rgba(0, 51, 255, 0.1)';
            cursor.style.borderRadius = '0';
            cursor.style.transform = 'translate(-50%, -50%) rotate(45deg)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderRadius = '50%';
            cursor.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        });
    });
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const sideMenu = document.getElementById('sideMenu');

if (hamburgerBtn && sideMenu) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        sideMenu.classList.toggle('active');
    });
}

const parallaxTrack = document.getElementById('hero-parallax-track');

window.addEventListener('scroll', () => {
    if (parallaxTrack) {
        const overlay = parallaxTrack.querySelector('.hero-img-overlay');
        
        const trackTop = parallaxTrack.offsetTop;
        const trackHeight = parallaxTrack.offsetHeight - window.innerHeight;

        let progress = (window.scrollY - trackTop) / trackHeight;
        progress = Math.max(0, Math.min(1, progress));

        let opacityProgress = (progress - 0.4) / 0.6; 
        opacityProgress = Math.max(0, Math.min(1, opacityProgress)); 

        const overlayOpacity = opacityProgress * 1; 

        if (overlay) overlay.style.opacity = overlayOpacity;
    }
});

document.querySelectorAll('a.transition-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetUrl = this.href;
        
        if (hamburgerBtn && sideMenu && sideMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            sideMenu.classList.remove('active');
        }

        setTimeout(() => {
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        }, 300);
    });
});

window.addEventListener('pageshow', () => {
    document.body.classList.remove('fade-out');
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
});

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
