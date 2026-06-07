document.addEventListener('DOMContentLoaded', () => {
    
    const qtyInput = document.getElementById('qtyInput');
    const btnMinus = document.getElementById('btnMinus');
    const btnPlus = document.getElementById('btnPlus');

    if(btnMinus && btnPlus && qtyInput) {
        btnMinus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        btnPlus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue < 99) {
                qtyInput.value = currentValue + 1;
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('galleryContainer');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-indicators .dot');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateGallery(index) {
        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            if (i === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));
    prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updateGallery(index);
        });
    });
    }
});
