// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

const audio = document.getElementById('audio');
const audioSource = document.getElementById('audio-source');
const prevButton = document.getElementById('prev-button');
const playButton = document.getElementById('play-button');
const nextButton = document.getElementById('next-button');
const playPauseButton = document.getElementById('play-pause-button');
const volumeSlider = document.getElementById("volume-slider");

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});

const musicTimeline = document.getElementById("music-timeline");

// Add an event listener to the audio element to update the timeline
audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
  
    // Calculate the progress as a percentage
    const progress = (currentTime / duration) * 100;
  
    // Update the value of the range input
    musicTimeline.value = progress;
  });
  
  // Add an event listener to the range input to seek to a specific position
  musicTimeline.addEventListener("input", () => {
    const progress = musicTimeline.value;
    const duration = audio.duration;
  
    // Calculate the time to seek to
    const seekTime = (progress / 100) * duration;
  
    // Update the audio's current time
    audio.currentTime = seekTime;
  });

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.classList.add('playing');
    } else {
        audio.pause();
        playPauseButton.classList.remove('playing');
    }
});

// Update the button and animation based on audio events
audio.addEventListener('play', () => {
    playPauseButton.classList.add('playing');
});

audio.addEventListener('pause', () => {
    playPauseButton.classList.remove('playing');
});

// List of music files in the 'music' folder
const musicFiles = [
    'music/music.m4a',
    // Add more music files as needed...
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack() {
    audioSource.src = musicFiles[currentTrackIndex];
    audio.load();
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.classList.remove('playing');
    } else {
        audio.play();
        playPauseButton.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
    loadTrack();
    playPause();
}

function playPrev() {
    currentTrackIndex = (currentTrackIndex - 1 + musicFiles.length) % musicFiles.length;
    loadTrack();
    playPause();
}

audio.addEventListener('ended', playNext);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);
playPauseButton.addEventListener('click', playPause);

// Load and play the first track
loadTrack();
playPause();