const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
let songIndex = 0;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songTitle = document.getElementById('songTitle');

// Load the initial song
loadSong(songs[songIndex]);

function loadSong(song) {
    audio.src = `music/${song}`;
    songTitle.textContent = song;
}

// Play song
function playSong() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playBtn.textContent = 'Play';
    }
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = 'Pause';
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = 'Pause';
}

// Event listeners
playBtn.addEventListener('click', playSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
