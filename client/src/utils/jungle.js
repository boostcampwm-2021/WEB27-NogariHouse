/* eslint-disable no-plusplus */
/*

용어 정리
BaseAudioContext vs AudioContext => BaseAudioContext가 AudioContext의 조상

AudioParam 인터페이스는 오디오 관련 매개 변수를 나타냄 => GainNode.gain이 AudioParam
AudioParam은 특정 값으로 설정하거나 변경 가능 & 특정 시간에 특정 패턴을 따르도록 할 수 있음

BaseAudioContext.createGain => GainNode 생성

GainNode => 음량의 변경을 나타냄, 출력되기 전에 입력 데이터에 주어진 음량 조정을 할 수 있음. GainNode.gain을 통해 변경

createBufferSource => 데이터를 넣거나 AudioBufferSourceNode를 통해 재생될 수 잇는 새로운 빈 AudioBuffer 생성

AudioBuffer => 로우 데이터를 메모리상에 두고 사용 45초 이하의 오디오 정보를 가지고 있다.
sample: 특정시간에 출력되는 사운드에 대응하는 float32 값
frame: 특정시간에 출력되는 각 channel의 사우드에 대응하는 Sample 집합 (frame = sample/channel)
sample Rate: 초당 출력되는 Frame의 수 (Hz)

setTargetAtTime => 특정 시간에 특정 패턴을 따르도록 할 수 있음

*/

function createDelayTimeBuffer(context, activeTime, fadeTime, shiftUp) {
  const length1 = activeTime * context.sampleRate;
  const length2 = (activeTime - 2 * fadeTime) * context.sampleRate;
  const length = length1 + length2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const p = buffer.getChannelData(0);

  // 1st part of cycle
  for (let i = 0; i < length1; ++i) {
    if (shiftUp) {
      p[i] = (length1 - i) / length; // This line does shift-up transpose
    } else {
      p[i] = i / length1; // This line does shift-down transpose
    }
  }

  // 2nd part
  for (let i = length1; i < length; ++i) {
    p[i] = 0;
  }

  return buffer;
}

function createFadeBuffer(context, activeTime, fadeTime) {
  const length1 = activeTime * context.sampleRate;
  const length2 = (activeTime - 2 * fadeTime) * context.sampleRate;
  const length = length1 + length2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const p = buffer.getChannelData(0);

  const fadeLength = fadeTime * context.sampleRate;

  const fadeIndex1 = fadeLength;
  const fadeIndex2 = length1 - fadeLength;

  // 1st part of cycle
  for (let i = 0; i < length1; ++i) {
    let value;

    if (i < fadeIndex1) {
      value = Math.sqrt(i / fadeLength);
    } else if (i >= fadeIndex2) {
      value = Math.sqrt(1 - (i - fadeIndex2) / fadeLength);
    } else {
      value = 1;
    }

    p[i] = value;
  }

  // 2nd part
  for (let i = length1; i < length; ++i) {
    p[i] = 0;
  }

  return buffer;
}

const delayTime = 0.100;
const fadeTime = 0.050;
const bufferTime = 0.100;

export default function Jungle(context) {
  this.context = context;
  // Create nodes for the input and output of this "module".
  const input = context.createGain();
  const output = context.createGain();
  this.input = input;
  this.output = output;

  // Delay modulation.
  const mod1 = context.createBufferSource();
  const mod2 = context.createBufferSource();
  const mod3 = context.createBufferSource();
  const mod4 = context.createBufferSource();
  this.shiftDownBuffer = createDelayTimeBuffer(context, bufferTime, fadeTime, false);
  this.shiftUpBuffer = createDelayTimeBuffer(context, bufferTime, fadeTime, true);
  mod1.buffer = this.shiftDownBuffer;
  mod2.buffer = this.shiftDownBuffer;
  mod3.buffer = this.shiftUpBuffer;
  mod4.buffer = this.shiftUpBuffer;
  mod1.loop = true;
  mod2.loop = true;
  mod3.loop = true;
  mod4.loop = true;

  // for switching between oct-up and oct-down
  const mod1Gain = context.createGain();
  const mod2Gain = context.createGain();
  const mod3Gain = context.createGain();
  mod3Gain.gain.value = 0;
  const mod4Gain = context.createGain();
  mod4Gain.gain.value = 0;

  mod1.connect(mod1Gain);
  mod2.connect(mod2Gain);
  mod3.connect(mod3Gain);
  mod4.connect(mod4Gain);

  // Delay amount for changing pitch.
  const modGain1 = context.createGain();
  const modGain2 = context.createGain();

  const delay1 = context.createDelay();
  const delay2 = context.createDelay();
  mod1Gain.connect(modGain1);
  mod2Gain.connect(modGain2);
  mod3Gain.connect(modGain1);
  mod4Gain.connect(modGain2);
  modGain1.connect(delay1.delayTime);
  modGain2.connect(delay2.delayTime);

  // Crossfading.
  const fade1 = context.createBufferSource();
  const fade2 = context.createBufferSource();
  const fadeBuffer = createFadeBuffer(context, bufferTime, fadeTime);
  fade1.buffer = fadeBuffer;
  fade2.buffer = fadeBuffer;
  fade1.loop = true;
  fade2.loop = true;

  const mix1 = context.createGain();
  const mix2 = context.createGain();
  mix1.gain.value = 0;
  mix2.gain.value = 0;

  fade1.connect(mix1.gain);
  fade2.connect(mix2.gain);

  // Connect processing graph.
  input.connect(delay1);
  input.connect(delay2);
  delay1.connect(mix1);
  delay2.connect(mix2);
  mix1.connect(output);
  mix2.connect(output);

  // Start
  const t = context.currentTime + 0.050;
  const t2 = t + bufferTime - fadeTime;
  mod1.start(t);
  mod2.start(t2);
  mod3.start(t);
  mod4.start(t2);
  fade1.start(t);
  fade2.start(t2);

  this.mod1 = mod1;
  this.mod2 = mod2;
  this.mod1Gain = mod1Gain;
  this.mod2Gain = mod2Gain;
  this.mod3Gain = mod3Gain;
  this.mod4Gain = mod4Gain;
  this.modGain1 = modGain1;
  this.modGain2 = modGain2;
  this.fade1 = fade1;
  this.fade2 = fade2;
  this.mix1 = mix1;
  this.mix2 = mix2;
  this.delay1 = delay1;
  this.delay2 = delay2;

  this.setDelay(delayTime);
}

// eslint-disable-next-line func-names
Jungle.prototype.setDelay = function (delayTimeVal) {
  this.modGain1.gain.setTargetAtTime(0.5 * delayTimeVal, 0, 0.010);
  this.modGain2.gain.setTargetAtTime(0.5 * delayTimeVal, 0, 0.010);
};

let previousPitch = -1;

// eslint-disable-next-line func-names
Jungle.prototype.setPitchOffset = function (mult) {
  if (mult > 0) { // pitch up
    this.mod1Gain.gain.value = 0;
    this.mod2Gain.gain.value = 0;
    this.mod3Gain.gain.value = 1;
    this.mod4Gain.gain.value = 1;
  } else { // pitch down
    this.mod1Gain.gain.value = 1;
    this.mod2Gain.gain.value = 1;
    this.mod3Gain.gain.value = 0;
    this.mod4Gain.gain.value = 0;
  }
  this.setDelay(delayTime * Math.abs(mult));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  previousPitch = mult;
};
