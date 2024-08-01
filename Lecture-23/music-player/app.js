let playBtn = document.querySelector('#play-btn');
let progress = document.querySelector('#progress');
let songList = document.querySelector('#song-list');
let forw = document.querySelector('.for');
let back = document.querySelector('.back');
let currentTimeDisplay = document.querySelector('#current-time');
let durationDisplay = document.querySelector('#duration');

let songs = [
    { name: "song1", id: 1 },
    { name: "song2", id: 2 },
    { name: "song3", id: 3 },
    { name: "song4", id: 4 }
];

let currSongIdx = 0;

// Adding song to the html 
for(let song of songs){
    let li = document.createElement('li');
    li.innerText = song.name;
    li.setAttribute('id', song.id);
    li.classList.add('song-item');
    songList.append(li);
}

// by default song is 0
const audio = new Audio(`./media/${songs[currSongIdx].name}.mp3`);


// Play pause
playBtn.addEventListener('click', function(){
    audio.paused ? audio.play() : audio.pause();
    togglePlayPauseIcon();
});

// Audio value and time updation
audio.addEventListener('timeupdate', function(){
    let currentProgress = (audio.currentTime * 100) / audio.duration;
    progress.value = currentProgress;
    updateTimeDisplays();
});

// progress bar updation
progress.addEventListener('change', function(){
    audio.currentTime = audio.duration * progress.value / 100;
    updateTimeDisplays();
});

// play song directly if user clicked on the song name
songList.addEventListener('click', function(e){
    let songId = e.target.getAttribute('id');
    currSongIdx = songs.findIndex(song => song.id == songId);
    audio.src = `./media/${songs[currSongIdx].name}.mp3`;
    audio.currentTime = 0;
    audio.play();
    togglePlayPauseIcon(false);
    updateTimeDisplays();
});

// Forward functionality
forw.addEventListener('click', function(){
    currSongIdx = (currSongIdx + 1) % songs.length;
    audio.src = `./media/${songs[currSongIdx].name}.mp3`;
    audio.currentTime = 0;
    audio.play();
    togglePlayPauseIcon(false);
    updateTimeDisplays();
});

// backaward functionality
back.addEventListener('click', function(){
    currSongIdx = (currSongIdx - 1 + songs.length) % songs.length;
    audio.src = `./media/${songs[currSongIdx].name}.mp3`;
    audio.currentTime = 0;
    audio.play();
    togglePlayPauseIcon(false);
    updateTimeDisplays();
});

// change icon either play button or pause button
function togglePlayPauseIcon(paused = audio.paused) {
    if (paused) {
        playBtn.children[0].classList.add('fa-play');
        playBtn.children[0].classList.remove('fa-pause');
    } else {
        playBtn.children[0].classList.add('fa-pause');
        playBtn.children[0].classList.remove('fa-play');
    }
}

// format time in min and sec
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
}

// update time duration in min and sec
function updateTimeDisplays() {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration - audio.currentTime);
}

audio.addEventListener('loadedmetadata', function() {
    durationDisplay.textContent = formatTime(audio.duration);
});