class Sound {
  static isPlaying = false;
  static audioList = [];

  constructor(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.loop = true;
    this.sound.muted = true;
    this.path = soundPath;
    this.isPaused = false;
    this.index = Sound.audioList.length;

    Sound.audioList.push(this);
  }

  static toggleSound(toggleButton) {
    if (Sound.isPlaying) {
      Sound.audioList.forEach((audio) => {
        audio.sound.muted = true;
      });

      toggleButton.innerHTML =
        '<i class="fa-solid fa-volume-xmark fa-2xl" style="color: #f8eb2b;"></i>';
      Sound.isPlaying = false;

      return;
    }

    Sound.audioList.forEach((audio) => {
      audio.sound.muted = false;
    });

    toggleButton.innerHTML = `<i class="fa-solid fa-volume-high fa-2xl" style="color: #fbeb2b;"></i>`;
    Sound.isPlaying = true;
  }

  playAudio() {
    const currentSound = Sound.audioList[this.index];

    if (currentSound.isPaused) {
      return;
    }

    this.sound.play();
  }

  pauseAudio() {
    const currentSound = Sound.audioList[this.index];
    currentSound.isPaused = true;
    this.sound.pause();
  }
}

export default Sound;
