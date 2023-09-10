// colling all
const playBtn = document.getElementById("Play");
const adio = document.getElementById("adio");
const audioWave = document.getElementById("water-wave");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const artistName = document.getElementById("artist");
const songTitle = document.getElementById("title");
const progress = document.getElementById("progress");
const progressDiv = document.getElementById("progress-div");
const songDuration = document.getElementById("duration");
const songCurrentTime = document.getElementById("current-time");

const songs = [
  {
    name: "m1",
    title: "As-Subhu",
    artist : "Waheed Zafar Qasmi",
     },
  {
    name: "m2",
    title: "Royalty",
    artist : "Egzod & Maestro Chives",
     },
  {
    name: "m3",
    title: "Middle of Night",
    artist : "Elley Duhé",
    
  },
  {
    name: "m4",
    title: "Ishqam",
    artist : "Mika Singh",
      },
  {
    name: "m5",
    title: "Lost Sky",
    artist : "feat. Chris Linton",
    
  },
  {
    name: "m6",
    title: "Ya Nabi",
    artist : "Maher Zain",
    
  },
  {
    name: "m7",
    title: "Tumse Mohabbat",
    artist : "JalRaj",
      },
  {
    name: "m8",
    title: "Ya Habibi",
    artist : "Ash King",
    
  }
];

const playSong = () =>{
  adio.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  audioWave.classList.add("water-wave");
}
const pauseSong = () =>{
  adio.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  audioWave.classList.remove("water-wave");
}

playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("fa-play")) {
    playSong();
  } else if (playBtn.classList.contains("fa-pause")) {
    pauseSong();
  }
});

// changing the music data



const loadSongs = (songs) =>{
  songTitle.textContent = songs.title;
  artistName.textContent = songs.artist;
  adio.src = `media/${songs.name}.mp3`;
}

songIndex = 0;

const nextSong = () =>{
  songIndex = (songIndex  + 1) % songs.length;
  loadSongs(songs[songIndex]);
  playSong();
}

const prevSong = () =>{
  songIndex = (songIndex  - 1 + songs.length) % songs.length;
  loadSongs(songs[songIndex]);
  playSong();
}


// progress js work

adio.addEventListener("timeupdate" , (e) =>{

const {currentTime, duration} = e.target;

let progressTime = (currentTime / duration) * 100;
progress.style.width =  `${progressTime}%`;

// music direction update

let minitDuration = Math.floor(duration / 60);
let secoundDuration = Math.floor(duration % 60);
let songLength = `${minitDuration}:${secoundDuration}`;
if (duration) {
  songDuration.innerHTML = songLength;
}
// music direction update

let minitCurrentTime = Math.floor(currentTime / 60);
let secoundCurrentTime = Math.floor(currentTime % 60);
if (secoundCurrentTime < 10) {
secoundCurrentTime = `0${secoundCurrentTime}`
}

let songSecound = `${minitCurrentTime}:${secoundCurrentTime}`;
songCurrentTime.innerHTML = songSecound;
});

// progress click functionality

progressDiv.addEventListener("click" , (e) => {

  const { duration } = adio;
  let moveProgress = (e.offsetX / e.target.clientWidth) * duration;

  adio.currentTime = moveProgress;
})

// if music end then next song will auto play
adio.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);