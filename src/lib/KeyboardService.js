class KeyboardService {
  constructor() {
    this.keyMap = {
      'KeyA': 'C3',    // Kick
      'KeyS': 'C#3',   // Snare
      'KeyD': 'D3',    // HH Closed
      'KeyF': 'D#3',   // HH Open
      'KeyQ': 'E3',    // Melody
      'KeyW': 'F3',    // Texture
      'KeyE': 'F#3',   // One Shot 1
      'KeyR': 'G3'     // One Shot 2
    };

    this.callbacks = new Map();
  }

  addCallback(key, callback) {
    this.callbacks.set(key, callback);
  }

  removeCallback(key) {
    this.callbacks.delete(key);
  }

  handleKeyDown(event) {
    const note = this.keyMap[event.code];
    if (note && this.callbacks.has(note)) {
      this.callbacks.get(note)();
    }
  }

  getKeyForNote(note) {
    return Object.entries(this.keyMap).find(([key, value]) => value === note)?.[0];
  }

  getNoteForKey(key) {
    return this.keyMap[key];
  }
}

// Create a singleton instance
const keyboardService = new KeyboardService();
export default keyboardService;