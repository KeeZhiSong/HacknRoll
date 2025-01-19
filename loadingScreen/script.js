const progressBar = document.getElementById('progress');
const progressMessage = document.getElementById('progress-message');
const continueBtn = document.getElementById('continue-btn');
const video = document.getElementById('placeholder-video');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('music-toggle');
const bgToggle = document.getElementById('bg-toggle');
let progress = 0;

// Background images array
const backgrounds = [
    'url(background/sky.jpeg)',
    'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000_F_582680539_LVSl8G0SBtLzQ8qNm16nU50Hp15XKAfs.jpg-CPtkEBeFB41kU8pcemq5JqhqGREq9A.jpeg)',
    'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/360_F_556561593_Ey1WecTaQ6bSa7C5eP3AdmxYv2UksmB6.jpg-QfWbMoUsQqxVdzSndwfakIPGikXEU6.jpeg)'
];
let currentBgIndex = 0;

// Background switcher
bgToggle.addEventListener('click', () => {
    currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[currentBgIndex];
});

const messages = [
    "Taking Quackers out on a walk...",
    "Optimizing rubber ducks...",
    "Counting pixels...",
    "Stealing hackathon food...",
    "Playing geoguesser...",
    "Preparing something amazing!",
    "Ready to quack!"
];

function updateProgress() {
    progress += 0.5;
    if (progress > 100) {
        progress = 0;
    }
    progressBar.style.width = progress + '%';

    const messageIndex = Math.floor((progress / 20) % messages.length);
    progressMessage.innerText = messages[messageIndex];
}

clearInterval(window.progressInterval);
window.progressInterval = setInterval(updateProgress, 100);

setTimeout(() => {
    continueBtn.style.display = 'block';
    continueBtn.style.left = '50%';
    continueBtn.style.top = 'calc(100% - 100px)';
    continueBtn.style.transform = 'translateX(-50%)';
}, 10000);

const videos = ['video1.mp4', 'video2.mp4'];
let currentVideoIndex = 0;

function changeVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    video.src = `videos/${videos[currentVideoIndex]}`;
}

setInterval(changeVideo, 40000);

continueBtn.addEventListener('click', () => {
    changeVideo();
    moveButton();
});

function moveButton() {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 70 + 20;
    continueBtn.style.left = x + '%';
    continueBtn.style.top = y + '%';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

let lastMousePosition = { x: 0, y: 0 };

const moveButtonDebounced = debounce((e) => {
    if (continueBtn.style.display === 'block') {
        const rect = continueBtn.getBoundingClientRect();
        const buttonCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };

        if (Math.abs(e.clientX - lastMousePosition.x) > 5 || Math.abs(e.clientY - lastMousePosition.y) > 5) {
            const angle = Math.atan2(e.clientY - buttonCenter.y, e.clientX - buttonCenter.x);
            const distance = 300;
            let newX = buttonCenter.x - Math.cos(angle) * distance;
            let newY = buttonCenter.y - Math.sin(angle) * distance;

            const screenPadding = 20;
            const maxX = window.innerWidth - screenPadding;
            const maxY = window.innerHeight - screenPadding;

            newX = newX < screenPadding ? maxX : (newX > maxX ? screenPadding : newX);
            newY = newY < screenPadding ? maxY : (newY > maxY ? screenPadding : newY);

            continueBtn.style.left = newX + 'px';
            continueBtn.style.top = newY + 'px';

            lastMousePosition = { x: e.clientX, y: e.clientY };
        }
    }
}, 50);

document.addEventListener('mousemove', moveButtonDebounced);

const games = ['Clicker', 'ScissorsPaperStone', 'MemoryGame', 'TicTacToe', 'flappybird'];

function showGames() {
    games.forEach((game, index) => {
        setTimeout(() => {
            const gameElement = document.getElementById(game);
            gameElement.classList.remove('hidden');
            
            if (index === games.length - 1) {
                setTimeout(triggerConfetti, 1000);
            }
        }, index * 4000);
    });
}

function showSmile() {
    const smileElement = document.getElementById('smile');
    
    // Add the 'visible' class after a delay
    setTimeout(() => {
        smileElement.classList.remove('hidden');
        smileElement.classList.add('visible');
    }, 3000); // Delay of 5000ms (5 seconds)
}

showSmile();

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

setTimeout(showGames, 3000);
setTimeout(showPhoto, 170000);

let isMusicPlaying = false;

function toggleMusic() {
    if (isMusicPlaying) {
        bgm.pause();
        musicToggle.textContent = 'Play Music';
    } else {
        bgm.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
        musicToggle.textContent = 'Pause Music';
    }
    isMusicPlaying = !isMusicPlaying;
}

musicToggle.addEventListener('click', toggleMusic);

window.addEventListener('load', () => {
    bgm.volume = 0.5;
    bgm.play().then(() => {
        isMusicPlaying = true;
        musicToggle.textContent = 'Pause Music';
    }).catch(error => {
        console.log("Audio autoplay failed:", error);
    });
});

bgm.load();

let countdownTime = 180;

const countdownInterval = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    countdownTime--;

    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
}, 1000);

