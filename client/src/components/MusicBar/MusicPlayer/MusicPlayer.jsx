import PlayIcon from "../../icons/PlayIcon";
import { useContext, useState } from "react";
import PauseIcon from "../../icons/PauseIcon";
import { PlayingContext } from "../../../contexts/PlayingContext";



const MusicPlayer = () => {

  const { playing, handleOnPlay } = useContext(PlayingContext);

// let seekBar = document.querySelector('.seek-bar');
// let playButton = document.querySelector('button.play');
// let playButtonIcon = playButton.querySelector('ion-icon');
// let fillBar = seekBar.querySelector('.fill');

// let mouseDown = false;

// playButton.addEventListener('click', function () {
//   if (audio.paused) {
//     audio.play();
//   } else {
//     audio.pause();
//   }
// })

// audio.addEventListener('play', function () {
//   playButtonIcon.name = 'pause';
// });

// audio.addEventListener('pause', function () {
//   playButtonIcon.name = 'play';
// });

// audio.addEventListener('timeupdate', function () {
//   if (mouseDown) return;

//   let p = audio.currentTime / audio.duration;

//   fillBar.style.width = p * 100 + '%';
// })

// function clamp (min, val, max) {
//   return Math.min(Math.max(min, val), max);
// }

// function getP (e) {
//   let p = (e.clientX- seekBar.offsetLeft) / seekBar.clientWidth;
//   p = clamp(0, p, 1);

//   return p;
// }

// seekBar.addEventListener('mousedown', function(e) {
//   mouseDown = true;

//   let p = getP(e);

//   fillBar.style.width = p * 100 + '%';
// })

// window.addEventListener('mousemove', function (e) {
//   if (!mouseDown) return;

//   let p = getP(e);

//   fillBar.style.width = p * 100 + '%';
// });

// window.addEventListener('mouseup', function (e) {
//   if (!mouseDown) return;

//   mouseDown = false;

//   let p = (e.clientX - seekBar.offsetLeft) / seekBar.clientWidth;
//   p = clamp(0, p, 1);

//   fillBar.style.width = p * 100 + '%';

//   audio.currentTime = p * audio.duration;
// })

  return (
    <div class="music-player">
      <button class="play" onClick={handleOnPlay}>
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div class="seek-bar">
        <div class="seek-bar__fill"></div>
        <div class="seek-bar__handle"></div>
      </div>
    </div>
  )
}

export default MusicPlayer;