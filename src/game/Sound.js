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
    Sound.instances.forEach((instance) => {
      if (instance.isPlaying) {
        instance.isPlaying = false;
        instance.sound.muted = true;
        toggleButton.innerHTML =
          '<i class="fa-solid fa-volume-xmark fa-2xl" style="color: #f8eb2b;"></i>';
        return;
      }

      instance.isPlaying = true;
      instance.sound.muted = false;
      toggleButton.innerHTML = `<i class="fa-solid fa-volume-high fa-2xl" style="color: #fbeb2b;"></i>`;
    });
  }

  playAudio() {
    this.sound.play();
  }

  pauseAudio() {
    this.sound.pause();
  }
}

export default Sound;
