class Sound {
  static instances = [];

  constructor(soundPath) {
    this.sound = new Audio(soundPath);
    this.sound.loop = true;
    this.sound.muted = true;
    this.isPlaying = false;
    this.path = soundPath;

    Sound.instances.push(this);
  }

  static toggleSound(toggleButton) {
    for (let i = 0; i < Sound.instances.length; i += 1) {
      const currentSound = Sound.instances[i];

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
  }

  playAudio() {
    this.sound.play();
  }

  pauseAudio() {
    this.sound.muted = true;
    Sound.instances.shift();
    this.sound.pause();
  }
}

export default Sound;
