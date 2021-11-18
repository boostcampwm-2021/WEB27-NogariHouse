/* eslint-disable */
export default class SoundMeter {
    context: any;

    instant: number;

    script: any;

    mic: any;

    pitchShifterProcessor: any;

    pitchRatio: number;

    constructor(context: AudioContext) {
      this.pitchRatio = 1;
      this.context = context;
      this.instant = 0.0;
      // this.script = context.createScriptProcessor(2048, 1, 1);
      this.pitchShifterProcessor = context.createScriptProcessor(256, 1, 1);
      this.pitchShifterProcessor.buffer = new Float32Array(256 * 2);
      // this.script.addEventListener('audioprocess', this.scriptHandler.bind(this));
      this.pitchShifterProcessor.addEventListener('audioprocess', this.pitchShiftHandler.bind(this));
    }

    pitchShiftHandler(event: any) {
      const inputData = event.inputBuffer.getChannelData(0);
      const outputData = event.outputBuffer.getChannelData(0);
      let sum = 0.0;

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < inputData.length; i++) {
        inputData[i] += 0.05;
        
        sum += inputData[i] * inputData[i];
      }
      this.instant = Math.sqrt(sum / inputData.length);
      
      const grainData = new Float32Array(256 * 2);
      for (var i = 0; i < 256; i++) {
        const a = inputData[i];
        const b = (i !== 255) ? inputData[i + 1] : 0;
        grainData[i] += a * b + 0.01
      }

      for (var i = 0; i < 256; i++) {
        outputData[i] = grainData[i]
      }
    }

    scriptHandler(event: any) {
      const input = event.inputBuffer.getChannelData(0);
      let i;
      let sum = 0.0;
      // eslint-disable-next-line no-plusplus
      for (i = 0; i < input.length; ++i) {
        sum += input[i] * input[i];
      }
      this.instant = Math.sqrt(sum / input.length);
    }

    connectToSource(isAnonymous: boolean, stream: MediaStream, callback: any) {
      try {
        this.mic = this.context.createMediaStreamSource(stream);
        this.mic.connect(this.pitchShifterProcessor);
        // this.script.connect(this.pitchShifterProcessor);
        this.pitchShifterProcessor.connect(this.context.destination);
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
      this.pitchShifterProcessor.disconnect();
      // this.script.disconnect();
    }
}
