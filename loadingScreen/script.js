const progressBar = document.getElementById('progress');
const progressMessage = document.getElementById('progress-message');
const continueBtn = document.getElementById('continue-btn');
const video = document.getElementById('placeholder-video');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('music-toggle');
let progress = 0;

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
        progress = 0; // Reset progress to 0 when it reaches 100
    }
    progressBar.style.width = progress + '%';

    const messageIndex = Math.floor((progress / 20) % messages.length);
    progressMessage.innerText = messages[messageIndex];
}

// Clear any existing intervals
clearInterval(window.progressInterval);

// Set a new interval for updating progress
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
            
            // If this is the last game, trigger the confetti
            if (index === games.length - 1) {
                setTimeout(triggerConfetti, 1000); // Wait 1 second after the last game appears
            }
        }, index * 10000); // 10 seconds interval between each game
    });
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Start showing games after 10 seconds
setTimeout(showGames, 10000);

// Background music controls
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

// Attempt to play music on page load
window.addEventListener('load', () => {
    bgm.volume = 0.5; // Set volume to 50%
    bgm.play().then(() => {
        isMusicPlaying = true;
        musicToggle.textContent = 'Pause Music';
    }).catch(error => {
        console.log("Audio autoplay failed:", error);
        // Autoplay failed, user will need to click the button to start the music
    });
});

// Preload audio
bgm.load();

document.addEventListener('mousemove', moveButtonDebounced);

// Set the countdown time in seconds
let countdownTime = 180; // 3 minutes

const countdownInterval = setInterval(() => {
    // Calculate minutes and seconds
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    // Decrease the countdown time
    countdownTime--;

    // Check if the countdown has finished
    if (countdownTime < 0) {
        clearInterval(countdownInterval);
        // Redirect to the specified URL
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Change this to your desired URL
    }
}, 1000);
