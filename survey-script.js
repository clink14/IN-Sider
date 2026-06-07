const surveyData = [
    {
        q: 'Q1.<br>내 생일을 먼저 챙겨준 친구가<br>올해 몇 명이에요?',
        options: ['5명 이상', '2~4명', '1명', '없거나 기억 안 난다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q2.<br>나한테 고민을 털어놓는<br>친구가 있어요?',
        options: ['여러 명 있다', '한두 명 있다', '있긴 한데 내가 더 많이 털어놓는다', '없다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q3.<br>내가 뭔가를 추천하면<br>친구들이 실제로 해본 적 있어요?',
        options: ['자주 있다', '가끔 있다', '별로 없다', '추천을 잘 안 한다'],
        scores: [12, 8, 4, 2] // 예외 점수 적용
    },
    {
        q: 'Q4.<br>연락이 끊겼던 사람이<br>먼저 다시 연락해온 적 있어요?',
        options: ['자주 있다', '가끔 있다', '거의 없다', '없다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q5.<br>"너 인맥 넓다" 또는<br>"너 아는 사람 많다" 는 말<br>들어본 적 있어요?',
        options: ['자주 들었다', '가끔 들었다', '별로 없다', '들어본 적 없다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q6.<br>내가 자리를 비웠을 때<br>"쟤 어디 갔어?" 하고<br>찾는 사람이 있을 것 같아요?',
        options: ['분명히 있을 것 같다', '한두 명은 있을 것 같다', '잘 모르겠다', '없을 것 같다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q7.<br>지난 6개월 안에<br>새로 친해진 사람이 있어요?',
        options: ['3명 이상', '1~2명', '있긴 한데 아직 어색하다', '없다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q8.<br>지금 당장 연락하면<br>같이 뭔가 할 수 있는 사람이 있어요?',
        options: ['5명 이상', '2~4명', '1명', '없다'],
        scores: [12, 8, 4, 0]
    },
    {
        q: 'Q9.<br>솔직하게,<br>지금 인간관계가 만족스러워요?',
        options: ['충분히 만족한다', '괜찮은 편이다', '조금 아쉽다', '솔직히 많이 아쉽다'],
        scores: [12, 8, 4, 0]
    }
];

let currentStep = 0;
let totalScore = 0;

function openSurvey() {
    currentStep = 0;
    totalScore = 0;
    document.getElementById('surveyOverlay').classList.add('active');
    document.getElementById('surveyContainerWindow').classList.remove('dark-mode');
    document.getElementById('surveyMainTitle').style.display = 'block';
    showQuestion();
}

function closeSurvey() {
    document.getElementById('surveyOverlay').classList.remove('active');
}

function showQuestion() {
    document.querySelectorAll('.survey-step').forEach(el => el.classList.remove('active'));
    document.getElementById('step-question').classList.add('active');

    const data = surveyData[currentStep];
    document.getElementById('questionText').innerHTML = data.q;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = ''; // 초기화

    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'survey-btn';
        btn.innerText = opt;
        btn.onclick = () => selectOption(data.scores[index]);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(score) {
    totalScore += score;
    currentStep++;

    if (currentStep < surveyData.length) {
        showQuestion();
    } else {
        processResult();
    }
}

function processResult() {
    document.querySelectorAll('.survey-step').forEach(el => el.classList.remove('active'));
    document.getElementById('surveyMainTitle').style.display = 'none'; // 제목 숨기기
    document.getElementById('step-loading').classList.add('active');

    setTimeout(() => {
        document.getElementById('step-loading').classList.remove('active');
        document.getElementById('step-result').classList.add('active');
        document.getElementById('surveyContainerWindow').classList.add('dark-mode'); // 다크 모드 적용

        calculateAndShowFinal();
    }, 1500); 
}

function calculateAndShowFinal() {
    let percent = 97;
    
    if (totalScore >= 101) percent = 7;
    else if (totalScore >= 91) percent = 16;
    else if (totalScore >= 81) percent = 28;
    else if (totalScore >= 71) percent = 41;
    else if (totalScore >= 61) percent = 54;
    else if (totalScore >= 51) percent = 65;
    else if (totalScore >= 41) percent = 74;
    else if (totalScore >= 31) percent = 82;
    else if (totalScore >= 21) percent = 88;
    else if (totalScore >= 11) percent = 93;
    else percent = 97;

    let message = "";
    if (percent >= 80) {
        message = "인간관계, 아직 시작도 안 한 거예요.<br>IN-Sider가 처음부터 같이할게요.";
    } else if (percent >= 50) {
        message = "잠재력은 있어요.<br>방향만 잡아주면 달라질 수 있어요.";
    } else if (percent >= 20) {
        message = "꽤 잘 하고 있어요.<br>조금만 더 다듬으면 완벽해져요.";
    } else {
        message = "이미 잘 하고 있네요.<br>IN-Sider가 있으면 더 완벽해질 수 있어요.";
    }

    let halfYear = Math.max(1, percent - 32);
    let oneYear = Math.max(1, Math.floor(percent / 3));
    if(percent <= 19) {
        halfYear = Math.max(1, percent - 5);
        oneYear = 1;
    }

    document.getElementById('finalPercent').innerText = percent;
    document.getElementById('resultMessage').innerHTML = message;
    
    document.getElementById('nowPercent').innerText = percent;
    document.getElementById('halfYearPercent').innerText = halfYear;
    document.getElementById('oneYearPercent').innerText = oneYear;

    drawJaggedChart(percent, halfYear, oneYear);
}

function drawJaggedChart(startP, midP, endP) {
    const canvas = document.getElementById('growthChart');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const padding = 20;
    const usableHeight = height - (padding * 2);
    const getY = (p) => padding + usableHeight * (p / 100);

    const startY = getY(startP);
    const midY = getY(midP);
    const endY = getY(endP);

    const points = [];
    const segments = 15;
    
    for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i;
        let base_y;
        
        if (i <= segments / 2) {
            const ratio = i / (segments / 2);
            base_y = startY + (midY - startY) * ratio;
        } else {
            const ratio = (i - segments / 2) / (segments / 2);
            base_y = midY + (endY - midY) * ratio;
        }

        let jitter = 0;
        if (i !== 0 && i !== segments && i !== Math.floor(segments/2)) {
            jitter = (Math.random() - 0.5) * 30; // 위아래 15px 흔들림
        }
        
        points.push({ x: x, y: base_y + jitter });
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, height); // 바닥에서 시작
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(width, height); // 오른쪽 끝 바닥
    ctx.closePath();
    ctx.fillStyle = 'rgba(223, 255, 0, 0.1)'; 
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    
    ctx.strokeStyle = '#e5ff00';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'miter';
    ctx.stroke();

    const drawDot = (x, y, radius, isMain) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isMain ? '#fff' : '#000';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#e5ff00';
        ctx.stroke();
    };

    drawDot(points[0].x, points[0].y, 6, true); // 시작점 크게
    drawDot(points[Math.floor(segments/2)].x, points[Math.floor(segments/2)].y, 4, false); // 중간점
    drawDot(points[segments].x, points[segments].y, 4, false); // 끝점
}

function goToShop() {
    window.location.href = 'shop.html';
}