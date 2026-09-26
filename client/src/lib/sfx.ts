let ctx: AudioContext | null = null;
function ac() {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}
function tone(freq: number, dur: number, type: OscillatorType, gain = 0.06, at = 0) {
  const c = ac();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + at + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(c.currentTime + at);
  o.stop(c.currentTime + at + dur);
}
export const sfx = {
  click() { tone(420, 0.05, "square", 0.03); },
  tick() { tone(880, 0.03, "square", 0.02); },
  play() { tone(240, 0.08, "triangle", 0.05); tone(480, 0.1, "sine", 0.03, 0.04); },
  gem() { tone(660, 0.07, "sine", 0.04); tone(990, 0.1, "sine", 0.03, 0.04); },
  win() { tone(523, 0.12, "sine", 0.06); tone(659, 0.14, "sine", 0.05, 0.08); tone(784, 0.22, "sine", 0.05, 0.16); },
  lose() { tone(180, 0.18, "sawtooth", 0.04); tone(110, 0.28, "sine", 0.05, 0.05); },
  crash() { tone(90, 0.35, "sawtooth", 0.07); tone(40, 0.4, "sine", 0.06); },
  cash() { tone(880, 0.08, "square", 0.04); tone(1320, 0.12, "sine", 0.04, 0.05); },
};
