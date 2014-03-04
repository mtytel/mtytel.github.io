
(
s.boot();

SynthDef(\boop, {|dur = 1.0, amp = 1.0, freq = 440|
  var env = EnvGen.ar(Env.new([1, 0.1, 0], [0.06, dur - 0.06]), doneAction: 2);
  Out.ar([0, 1], LFTri.ar([freq * 0.995, freq * 1.005], 0, env * amp))
}).add;

SynthDef(\mario, { |out, amp=0.3, freq=440, length=0.1, dur = 0.2|
  var snd, vol;
  snd = LFPulse.ar(freq)!2;
  vol = LFTri.ar(freq/50)!2;
  snd = snd * EnvGen.ar(Env.linen(0.001, length * dur, 0.03), doneAction:2);
  OffsetOut.ar(out, snd*amp*vol);
}).add;

// SynthDef for the bass
SynthDef(\mariobass, { |out, amp=0.5, freq=440, length=0.1, dur = 0.2|
  var snd;
  snd = LFTri.ar(freq)!2;
  snd = snd * EnvGen.ar(Env.linen(0.001, length * dur, 0.03), doneAction:2);
  OffsetOut.ar(out, snd*amp);
}).add;

// SynthDef for percussion sounds
SynthDef(\beat, { |out, amp=0.3, sustain=0.1, dur=0.1|
  var snd;
  snd = BrownNoise.ar()!2;
  snd = HPF.ar(snd, 2000);
  snd = snd * EnvGen.ar(Env.linen(0.005, dur * sustain, 0.01), doneAction:2);
  OffsetOut.ar(out, snd*amp);
}).add;

SynthDef(\bass, { |freq = 440, gate = 1, amp = 0.5, slideTime = 0.17, ffreq = 1100, width = 0.15,
    detune = 1.005, preamp = 4, dur = 0.2, length = 0.2|
  var sig,
    env = Env.adsr(0.01, 0.3, 0.4, 0.1);
  freq = Lag.kr(freq, slideTime);
  sig = Mix(VarSaw.ar([freq, freq * detune], 0, width, preamp)).distort * amp
    * EnvGen.kr(env, gate * dur * length , doneAction: 2);
  sig = LPF.ar(sig, ffreq);
  Out.ar(0, sig ! 2)
}).add;
)

(
~create_riff = { |length = 4, maxval = 5, lookback = 1, offset = 0, stddev = 0|
  var rout;
  rout = {
    var hist, val;
    hist = [];

    length.do {
      if (lookback > hist.size(), {
        val = maxval.rand + 1;
      }, {
        val = gauss(hist[0] + offset, stddev) % (maxval + 1);
        hist.removeAt(0);
      });
      hist = hist.add(val);
      val.yield;
    };
  };
  Prout(rout);
};

~create_dep_riff = { |pat, offset = 0, stddev = 0|
  Pgauss(pat + offset, stddev);
};

)

(
var data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, seeds, numsections, basefreq, speed, repeats;
numsections = 8;
seeds = [];
repeats = [];

data1 = [];
data2 = [];
data3 = [];
data4 = [];
data5 = [];
data6 = [];
data7 = [];
data8 = [];
data9 = [];
data10 = [];

seeds = [970736, 970736, 709930, 709930, 970736, 970736,
         935060, 935060, 848516, 789847, 307888, 307888, 848516, 935060, 935060,
         773389, 192283, 773389, 192283,
         72548, 72548, 541789, 72548, 72548, 541789,
         453182, 547385, 453182, 547384, 410342, 310044, 310044,
         30540, 30540, 875388, 952767, 242691, 952767, 242691, 952767, 242691, 952767, 242691,
         30540, 30540, 30540, 30540, 30540, 30540, 30540];
/*numsections.do {
  seeds = seeds.add(1000000.rand);
};*/
/*
seeds = [581880, 19388, 581880, 19388, 318818, 19388, 838638, 19388, 838638,
         19388, 318818, 19388, 838638, 19388, 838638, 26420, 26420, 477461, 477461, 17327,
         146660, 146660, 146660, 146660, 26420, 26420, 477461, 477461, 477461, 477461];
*/
thisThread.randSeed = 970736;
basefreq = 80.rand + 80;
basefreq.postln;
speed = 1.5.rand + 0.8;

seeds.postln;

seeds.size().do({ |i|
  var mult1, mult2, div1, div2, dur1, freq;
  thisThread.randSeed = seeds[i];
  t = [seeds[i]];
  d = 5.rand + 1;
  m = max(1, d + 3.rand - 1);
  freq = basefreq * m / d;

  mult1 = ~create_riff.value(128, 5.rand + 2, 16.rand + 1, 2.0.rand - 1, 0.9.rand);
  mult2 = ~create_riff.value(128, 5.rand + 2, 16.rand + 1, 2.0.rand - 1, 0.9.rand);

  div1 = ~create_riff.value(128, 5.rand + 2, 16.rand + 1, 2.0.rand - 1, 0.9.rand);
  div2 = ~create_riff.value(128, 5.rand + 2, 16.rand + 1, 2.0.rand - 1, 0.9.rand);

  dur1 = 1 / (2 ** round(~create_riff.value(128, 3, 4.rand + 1, 2.0.rand - 1, 0.9.rand)));
  l = 4.rand / 2 + 1;
  p = Pconst(l, dur1).asStream.all;
  q = Pconst(l, dur1).asStream.all;
  r = Pconst(l, dur1).asStream.all;

  w = Pconst(l, dur1).asStream.all;
  x = Pconst(l, dur1).asStream.all;
  y = Pconst(l, dur1).asStream.all;

  m = Pconst(l, dur1).asStream.all;
  n = Pconst(l, dur1).asStream.all;
  o = Pconst(l, dur1).asStream.all;
  a = Pconst(l, dur1).asStream.all;
  b = Pconst(l, dur1).asStream.all;
  c = Pconst(l, dur1).asStream.all;
  repeats = 2 ** (2.rand + 1);

  data1 = data1.add(Pseed(Pseq(t), Pbind(
        \dur, Pconst(l * repeats, Pseq(p, inf)) * speed,
        \length, Pseq(w, inf),
        \freq_div, max(1, round(div1)),
        \freq_mult, max(1, round(mult1)),
        \amp, 0.3,
        \base_freq, freq,
        \instrument, \mariobass,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data2 = data2.add(Pseed(Pseq(t + 1), Pbind(
        \dur, Pconst(l * repeats, Pseq(q, inf)) * speed,
        \length, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.3,
        \base_freq, 2 * freq,
        \instrument, \mario,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data3 = data3.add(Pseed(Pseq(t + 3), Pbind(
        \dur, Pconst(l * repeats, Pseq(q, inf)) * speed,
        \length, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.3,
        \base_freq, 4 * freq,
        \instrument, \boop,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data4 = data4.add(Pseed(Pseq(t + 2), Pbind(
        \dur, Pconst(l * repeats, Pseq(r, inf)) * speed,
        \length, Pseq(y, inf),
        \amp, 0.1,
        \instrument, \beat,
        )));

  data5 = data5.add(Pseed(Pseq(t) + 4, Pbind(
        \dur, Pconst(l * repeats, Pseq(m, inf)) * speed,
        \length, Pseq(w, inf),
        \freq_div, max(1, round(div1)),
        \freq_mult, max(1, round(mult1)),
        \amp, 0.3,
        \base_freq, freq,
        \instrument, \mariobass,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data6 = data6.add(Pseed(Pseq(t + 5), Pbind(
        \dur, Pconst(l * repeats, Pseq(n, inf)) * speed,
        \length, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.3,
        \base_freq, 2 * freq,
        \instrument, \mario,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data7 = data7.add(Pseed(Pseq(t + 6), Pbind(
        \dur, Pconst(l * repeats, Pseq(a, inf)) * speed,
        \length, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.3,
        \base_freq, 4 * freq,
        \instrument, \boop,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data8 = data8.add(Pseed(Pseq(t) + 7, Pbind(
        \dur, Pconst(l * repeats, Pseq(b, inf)) * speed,
        \length, Pseq(w, inf),
        \freq_div, max(1, round(div1)),
        \freq_mult, max(1, round(mult1)),
        \amp, 0.3,
        \base_freq, freq,
        \instrument, \mariobass,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data9 = data9.add(Pseed(Pseq(t + 8), Pbind(
        \dur, Pconst(l * repeats, Pseq(c, inf)) * speed,
        \length, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.3,
        \base_freq, freq,
        \instrument, \mario,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data10 = data10.add(Pseed(Pseq(t + 9), Pbind(
        \dur, Pconst(l * repeats, Pseq(o, inf)) * speed,
        \length, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.3,
        \base_freq, 8 * freq,
        \instrument, \boop,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));
});

a = Pseq(data1, 1).play;
b = Pseq(data2, 1).play;
c = Pseq(data3, 1).play;
d = Pseq(data4, 1).play;
e = Pseq(data5, 1).play;
f = Pseq(data6, 1).play;
g = Pseq(data7, 1).play;
h = Pseq(data8, 1).play;
i = Pseq(data9, 1).play;
j = Pseq(data10, 1).play;
)

(a.stop;
 b.stop;
 c.stop;
 d.stop;
 e.stop;
 f.stop;
 g.stop;
 h.stop;
 i.stop;
 j.stop;
)
