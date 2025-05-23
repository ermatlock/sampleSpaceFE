import { Sampler, Sequence, start, Transport } from 'tone';

class AudioEngine {
  constructor() {
    this.sampler = null;
    this.sequencer = null;
    this.isPlaying = false;
    this.currentStepIndex = 0;
    this.bpm = 120;
    this.steps = [];
    this.samples = {};
    this.isInitialized = false;
  }

  async initialize(samples) {
    if (!this.isInitialized) {
      // Initialize Tone.js only after user interaction
      await start();
      this.isInitialized = true;
    }

    // Create sampler with all samples
    this.sampler = new Sampler(samples).toDestination();
    this.samples = samples;
  }

  async resumeAudioContext() {
    if (!this.isInitialized) {
      await start();
      this.isInitialized = true;
    }
  }

  async loadKit(kit) {
    if (!kit) return;

    // Update samples
    const samples = {
      C3: kit.elements.kick.sound_url,
      "C#3": kit.elements.snare.sound_url,
      D3: kit.elements.hh_closed.sound_url,
      "D#3": kit.elements.hh_open.sound_url,
      E3: kit.elements.melody.sound_url,
      F3: kit.elements.texture.sound_url,
      "F#3": kit.elements.one_shot_1.sound_url,
      G3: kit.elements.one_shot_2.sound_url,
    };

    // Initialize sampler with new samples
    await this.initialize(samples);

    // Set sequence and BPM
    this.steps = kit.sequence;
    this.bpm = kit.bpm;
    Transport.bpm.value = this.bpm;
  }

  playNote(note) {
    if (this.sampler) {
      this.sampler.triggerAttack(note);
    }
  }

  startSequencer() {
    if (this.sequencer) {
      this.sequencer.dispose();
    }

    this.sequencer = new Sequence(
      (time, step) => {
        this.currentStepIndex = step;
        if (this.steps[step]) {
          this.steps[step].forEach(note => {
            this.sampler.triggerAttackRelease(note, "16n", time);
          });
        }
      },
      [...Array(16).keys()],
      "16n"
    );

    this.sequencer.start(0);
    Transport.start();
    this.isPlaying = true;
  }

  stopSequencer() {
    if (this.sequencer) {
      this.sequencer.stop();
      Transport.stop();
      this.isPlaying = false;
      this.currentStepIndex = 0;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.stopSequencer();
    } else {
      this.startSequencer();
    }
    return this.isPlaying;
  }

  updateBpm(newBpm) {
    this.bpm = newBpm;
    Transport.bpm.value = newBpm;
  }

  updateSteps(newSteps) {
    this.steps = newSteps;
  }

  getCurrentStepIndex() {
    return this.currentStepIndex;
  }
}

// Create a singleton instance
const audioEngine = new AudioEngine();
export default audioEngine;