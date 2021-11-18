/* eslint-disable */

export default class SoundMeter {
  constructor(context) {
    this.context = context;
    this.instant = 0.0;
    this.script = context.createScriptProcessor(2048, 1, 1);
    this.script.addEventListener('audioprocess', this.audioprocessHandler.bind(this));
  }

  audioprocessHandler(event) {
    const input = event.inputBuffer.getChannelData(0);
    let i;
    let sum = 0.0;
    for (i = 0; i < input.length; ++i) {
      sum += input[i] * input[i];
    }
    this.instant = Math.sqrt(sum / input.length);
  }

  connectToSource(stream, callback) {
    try {
      this.mic = this.context.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      this.script.connect(this.context.destination);
      if (typeof callback !== 'undefined') {
        callback(null);
      }
    } catch (e) {
      console.error(e);
      if (typeof callback !== 'undefined') {
        callback(e);
      }
    }
  }

  stop() {
    this.mic.disconnect();
    this.script.disconnect();
  }

}

