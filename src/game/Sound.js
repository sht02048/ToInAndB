class Sound {
  static instances = [];

  constructor(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.loop = true;
    this.sound.muted = true;
    this.isPlaying = false;

    Sound.instances.push(this);
  }

  static toggleSound(toggleButton) {
    const currentSound = Sound.instances[Sound.instances.length - 1];

    if (currentSound.isPlaying) {
      currentSound.isPlaying = false;
      currentSound.sound.muted = true;
      toggleButton.innerHTML =
        '<i class="fa-solid fa-volume-xmark fa-2xl" style="color: #f8eb2b;"></i>';
      return;
    }

    currentSound.isPlaying = true;
    currentSound.sound.muted = false;
    toggleButton.innerHTML = `<i class="fa-solid fa-volume-high fa-2xl" style="color: #fbeb2b;"></i>`;
  }

  playAudio() {
    this.sound.play();
  }

  pauseAudio() {
    this.sound.pause();
  }
}

export default Sound;
