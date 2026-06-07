function bindAboutElementsToCursor() {
    const mainCursor = document.querySelector('.cursor');
    if (!mainCursor) return;

    const aboutTargets = document.querySelectorAll('.tab-btn, .interactive-zone, .device-hitbox, .survey-opt-btn, .switch-btn, .test-trigger-btn');
    
    aboutTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            mainCursor.style.width = '28px';  
            mainCursor.style.height = '28px'; 
            mainCursor.style.backgroundColor = 'rgba(0, 51, 255, 0.1)';
            mainCursor.style.borderRadius = '0';
            mainCursor.style.transform = 'translate(-50%, -50%) rotate(45deg)';
        });
        el.addEventListener('mouseleave', () => {
            mainCursor.style.width = '20px';
            mainCursor.style.height = '20px';
            mainCursor.style.backgroundColor = 'transparent';
            mainCursor.style.borderRadius = '50%';
            mainCursor.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        });
    });
}

function initAboutParallaxScroll() {
    const aboutTrack = document.getElementById('about-hero-track');
    
    window.addEventListener('scroll', () => {
        if (aboutTrack) {
            const overlay = aboutTrack.querySelector('.hero-img-overlay');
            const interactionMap = aboutTrack.querySelector('.interaction-map');
            const titleGroup = aboutTrack.querySelector('.hero-title-group');
            
            const hudLeft = aboutTrack.querySelector('.hud-left');
            const hudRight = aboutTrack.querySelector('.hud-right');
            
            const trackTop = aboutTrack.offsetTop;
            const trackHeight = aboutTrack.offsetHeight - window.innerHeight;
            
            let progress = (window.scrollY - trackTop) / trackHeight;
            progress = Math.max(0, Math.min(1, progress));
            
            let opacityProgress = (progress - 0.2) / 0.7; 
            opacityProgress = Math.max(0, Math.min(1, opacityProgress)); 

            const overlayOpacity = opacityProgress * 1; 

            if (overlay) overlay.style.opacity = overlayOpacity;

            if (overlayOpacity >= 0.4) {
                if (interactionMap) interactionMap.style.pointerEvents = 'none'; 
                if (titleGroup) titleGroup.style.opacity = '1';                  
                if (hudLeft) hudLeft.style.opacity = '0';
                if (hudRight) hudRight.style.opacity = '0';
            } else {
                if (interactionMap) interactionMap.style.pointerEvents = 'auto'; 
                if (titleGroup) titleGroup.style.opacity = '0';                  
                if (hudLeft) hudLeft.style.opacity = '';
                if (hudRight) hudRight.style.opacity = '';
            }
        }
    });
}

function initHeroImageSwitcher() {
    const heroBase = document.querySelector('.about-hero-base');

    const imgBch = "about_img/BCH_interaction.png";  
    const imgGy = "about_img/GY_interaction.png";    
    const imgDefault = "about_img/about_main.png";   

    const zoneBch = document.querySelector('.zone-bch');
    const zoneGy = document.querySelector('.zone-gy');

    function changeHeroBg(imgUrl) {
        if (!heroBase) return;
        heroBase.style.width = '100%';
        heroBase.style.height = '100%';
        heroBase.style.background = `url('${imgUrl}') no-repeat center / cover`;
    }

    if (zoneBch) {
        zoneBch.addEventListener('mouseenter', () => { changeHeroBg(imgBch); });
        zoneBch.addEventListener('mouseleave', () => { changeHeroBg(imgDefault); });
    }
    if (zoneGy) {
        zoneGy.addEventListener('mouseenter', () => { changeHeroBg(imgGy); });
        zoneGy.addEventListener('mouseleave', () => { changeHeroBg(imgDefault); });
    }
}

function switchTab(tabId, btn) {
    const currentTab = document.querySelector('.tab-content.active');
    const targetTab = document.getElementById(tabId);

    if (!targetTab || currentTab === targetTab) return;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (currentTab) {
        currentTab.classList.remove('tab-visible');
        currentTab.classList.add('tab-fade-out');

        setTimeout(() => {
            currentTab.classList.remove('active', 'tab-fade-out');

            targetTab.classList.add('active');

            requestAnimationFrame(() => {
                targetTab.classList.add('tab-visible');
            });

            window.scrollTo({
                top: document.querySelector('.about-tabs').offsetTop,
                behavior: 'smooth'
            });
        }, 450);
    } else {
        targetTab.classList.add('active');

        requestAnimationFrame(() => {
            targetTab.classList.add('tab-visible');
        });
    }
}

function dimHero(isDim) {
    const hero = document.getElementById('aboutHero');
    if (hero) {
        if (isDim) hero.classList.add('dimmed');
        else hero.classList.remove('dimmed');
    }
}

let isTerminalActivated = false;
const terminalText = `[!] CRITICAL_SYS: IN-SIDER_OS_V4.7 // CORE_INIT_SUCCESSFUL\n\n[SYS_LOG // LOCAL_TARGET_LOCK]\n  SYS_STATUS: SCANNING_FIELD_ENVIRONMENTS...\n  REF_USER:   BYEONGCHEOL / USER_0821 [BIO_STABLE: SHI_088]\n  REF_TARGT:  GAYOUNG / SUBJECT_0044 [LOCK_ON // DIST: 1.8M]\n  VID_FEED:   EYE_TRACKING_HARDWARE_SYNC_100\n\n[SYS_LOG // COGNITIVE_DATA_HARVEST]\n  METRICS:    RUN_BACKGROUND_BYPASS_CRAWLER... OK\n  INT_LOGS:   48H_DIGITAL_FOOTPRINT // INTERCEPTED_STREAM_DATA\n  TAG_EXTR:   #INDIE_BAND #CITY_POP [FREQ_VAL: 98.2]\n  BIO_SCAN:   PUPIL_DILATION_DETECTED // GAIT_TEMPO_ANALYSIS\n  EMO_STAT:   DEFENSE_WALL_VAL: -23% // [PROP: REGRET_AND_LONELINESS]\n\n[SYS_LOG // ALGORITHM_SIMULATION]\n  SIM_ENG:    COMPUTING 14200 INTERACTION_SCENARIOS... OK\n  SYNC_VAL:   ██████████░ 92% [CAMOUFLAGE_POTENTIAL: MAX]\n  TIME_OPT:   TARGET_FATIGUE_PEAK // EXEC_WINDOW: 19:15_KST\n\n[SYS_LOG // AUTONOMOUS_SCRIPT_SYNTHESIS]\n  AUDIO_INJ:  STREAMING TO AUDIO_OUTPUT_CHANNEL_01 [BONE_CONDUCTION]\n  SYS_INSTR:  EXECUTE SCRIPT GENERATION WITHOUT SUBJECTIVE COGNITION:\n  └─ DATA:    "요즘 그 인디 밴드 노래 레트로하고 좋더라고요."\n\n[SYS_LOG // BEHAVIORAL_MOTOR_CONTROL]\n  ANG_LOCK:   FORCE_FIXATE_USER_PUPIL [TARGET_GLABELLA_UNDER_2CM]\n  BIO_MOD:    INJECTING_BETA_BLOCKER_STIMULI // TRIGGER [SMILE_MODE_C]\n  MTR_GUIDE:  INJECT_PACING_SIGNAL // MAINTAIN_OVERLAP_DISTANCE_1.2M\n\n[⚠️ SYS_CRITICAL_WARNING]\nINTERFERENCE_RATE: 98.6% // USER_SYSTEM_SYNCHRONIZATION: FULL\nDISMISS INDEPENDENT WILL. TRUST THE INTERFACE. COGNITIVE INTERVENTION DENIED.`;

const deviceImgTarget = document.getElementById('deviceObj');
if (deviceImgTarget) {
    deviceImgTarget.addEventListener('click', () => {
        if (isTerminalActivated) return;
        isTerminalActivated = true;
        
        const win = document.getElementById('terminalWindow');
        const body = document.getElementById('terminalBody');
        if (win && body) {
            win.style.display = 'block';
            let i = 0;
            body.innerHTML = '';
            
            function type() {
                if (i < terminalText.length) {
                    body.innerHTML += terminalText.charAt(i);
                    i++;
                    setTimeout(type, 3);
                }
            }
            type();
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    bindAboutElementsToCursor();
    initHeroImageSwitcher();
    initAboutParallaxScroll();
    initManifestoInteraction();

    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        requestAnimationFrame(() => {
            activeTab.classList.add('tab-visible');
        });
    }
});

function initManifestoInteraction() {
    const manifestoLines = document.querySelectorAll('.manifesto-text');

    if (!manifestoLines.length) return;

    function updateManifestoLines() {
        const viewportCenter = window.innerHeight * 0.52;

        let closestLine = null;
        let closestDistance = Infinity;

        manifestoLines.forEach(line => {
            const rect = line.getBoundingClientRect();
            const lineCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - lineCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestLine = line;
            }
        });

        manifestoLines.forEach(line => {
            line.classList.remove('active-line');
        });

        if (closestLine) {
            closestLine.classList.add('active-line');
        }
    }

    updateManifestoLines();

    window.addEventListener('scroll', updateManifestoLines);
    window.addEventListener('resize', updateManifestoLines);
}