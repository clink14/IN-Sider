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

    // 슬라이드 이동 함수
    function updateGallery(index) {
        // 처음에서 이전 누르면 맨 끝으로, 끝에서 다음 누르면 처음으로 무한 반복
        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        // 컨테이너를 왼쪽으로 100%, 200% 밀어서 사진을 넘김
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 하단 점(인디케이터) 색상 업데이트
        dots.forEach((dot, i) => {
            if (i === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    // 좌우 버튼 클릭 이벤트
    nextBtn.addEventListener('click', () => updateGallery(currentIndex + 1));
    prevBtn.addEventListener('click', () => updateGallery(currentIndex - 1));

    // 하단 점 클릭 이벤트 (원하는 사진으로 바로가기)
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            updateGallery(index);
        });
    });

    // (보너스) 기존 수량 조절 버튼 기능도 그대로 유지하려면 아래 코드도 같이 넣어주세요!
    const btnMinus = document.getElementById('btnMinus');
    const btnPlus = document.getElementById('btnPlus');
    const qtyInput = document.getElementById('qtyInput');

    if (btnMinus && btnPlus && qtyInput) {
        btnMinus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) qtyInput.value = currentValue - 1;
        });

        btnPlus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue < 99) qtyInput.value = currentValue + 1;
        });
    }
});