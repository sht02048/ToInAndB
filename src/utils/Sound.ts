class Sound {
  private path: string;
  private index: number;

  public sound: HTMLAudioElement;
  public isPaused: boolean;

  static hasIntroPlayed = false;
  static isPlaying = false;
  static audioList = [];
  static muteToggle = document.getElementById("mute-toggle");

  constructor(soundPath: string) {
    this.sound = new Audio(soundPath);
    this.sound.loop = true;
    this.sound.muted = !Sound.isPlaying;
    this.path = soundPath;
    this.isPaused = false;
    this.index = Sound.audioList.length;

    Sound.audioList.push(this);
  }

  static unmute(): void {
    Sound.audioList.forEach((audio) => {
      audio.sound.muted = false;
    });

    if (Sound.isPlaying) {
      return;
    }

    Sound.muteToggle.innerHTML = `<i class="fa-solid fa-volume-high fa-2xl" style="color: #fbeb2b;"></i>`;
    Sound.isPlaying = true;
  }

  static mute(): void {
    Sound.audioList.forEach((audio) => {
      audio.sound.muted = true;
    });

    if (!Sound.isPlaying) {
      return;
    }

    Sound.muteToggle.innerHTML =
      '<i class="fa-solid fa-volume-xmark fa-2xl" style="color: #f8eb2b;"></i>';
    Sound.isPlaying = false;
  }

  public playAudio(): void {
    const currentSound = Sound.audioList[this.index];

    if (currentSound.isPaused) {
      return;
    }

    this.sound.play();
  }

  public pauseAudio(): void {
    const currentSound = Sound.audioList[this.index];
    currentSound.isPaused = true;
    this.sound.pause();
  }
}

export default Sound;
