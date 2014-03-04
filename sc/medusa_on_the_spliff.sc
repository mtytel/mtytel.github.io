
(
s.boot();
SynthDef(\mario, { |out, amp=0.1, freq=440, length=0.1, dur = 0.2|
  var snd;
  snd = LFPulse.ar(freq)!2;
  snd = snd * EnvGen.ar(Env.linen(0.01, length * dur, 0.1), doneAction:2);
  OffsetOut.ar(out, snd*amp);
}).add;

SynthDef(\krgn_gen_fmdevil,{
	arg out=0, freq=440, amp=0.2, index=3, detune=1.02, gate=1;
	var mod1, mod2, mod3, car, idx, env;
	env = EnvGen.ar(Env.adsr(0,0.4,0.3,0.2),gate: gate, levelScale: amp, doneAction: 2);
	idx = EnvGen.ar(Env.adsr(0,0.8,0.0,0.8),gate: gate, levelScale: index);
	mod1 = SinOsc.ar((freq / 12) * 2, LocalIn.ar(2), idx);
	mod2 = SinOsc.ar((freq / 12) * 6, mod1, idx);
	mod3 = SinOsc.ar([(freq / 12) * (9 * detune.neg), (freq / 12) * (9*detune)], mod2, idx);
	LocalOut.ar( mod3 * 0.25);
	car = SinOsc.ar(freq, mod3, env);
	Out.ar(out!2,car)
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

seeds = [241460, 241460, 502901, 502901, 395745, 395745, 553107, 553107,
         241460, 241460, 502901, 502901, 395745, 395745,
         955591, 42123, 955591, 42123,
         523670, 241460, 241460, 523670, 553107, 553107,
         219268, 313131, 219268, 313131, 219268,
         955591, 42123, 955591, 42123,
         239101, 239101, 219268, 313131,
         219268, 219268, 219268, 313131, 968448, 968448, 968448, 968448];
thisThread.randSeed = 28747;
basefreq = 80.rand + 65;
basefreq.postln;
speed = 1.5.rand + 0.7;

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
        \gate, Pseq(w, inf),
        \freq_div, max(1, round(div1)),
        \freq_mult, max(1, round(mult1)),
        \amp, 0.2,
        \index, 3.0.rand,
        \base_freq, freq,
        \instrument, \krgn_gen_fmdevil,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data2 = data2.add(Pseed(Pseq(t + 1), Pbind(
        \dur, Pconst(l * repeats, Pseq(q, inf)) * speed,
        \gate, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.2,
        \index, 3.0.rand,
        \base_freq, 2 * freq,
        \instrument, \krgn_gen_fmdevil,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data3 = data3.add(Pseed(Pseq(t + 3), Pbind(
        \dur, Pconst(l * repeats, Pseq(o, inf)) * speed,
        \gate, Pseq(x, inf),
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.2,
        \index, 3.0.rand,
        \base_freq, 4 * freq,
        \instrument, \krgn_gen_fmdevil,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data5 = data5.add(Pseed(Pseq(t + 4), Pbind(
        \dur, Pconst(l * repeats, Pseq(m, inf)) * speed,
        \length, Pseq(w, inf) / 1.5,
        \freq_div, max(1, round(div1)),
        \freq_mult, max(1, round(mult1)),
        \amp, 0.15,
        \index, 3.0.rand,
        \base_freq, 8 * freq,
        \instrument, \mario,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data6 = data6.add(Pseed(Pseq(t + 6), Pbind(
        \dur, Pconst(l * repeats, Pseq(r, inf)) * speed,
        \length, Pseq(x, inf) / 1.5,
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.15,
        \base_freq, 4 * freq,
        \instrument, \mario,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));

  data7 = data7.add(Pseed(Pseq(t + 7), Pbind(
        \dur, Pconst(l * repeats, Pseq(w, inf)) * speed,
        \length, Pseq(x, inf) / 1.5,
        \freq_div_src, max(1, round(div1)),
        \freq_mult_src, max(1, round(mult1)),
        \freq_div, Pkey(\freq_div_src) * max(1, round(div2)),
        \freq_mult, Pkey(\freq_mult_src) * max(1, round(mult2)),
        \amp, 0.15,
        \base_freq, 2 * freq,
        \instrument, \mario,
        \freq, Pkey(\base_freq) * Pkey(\freq_mult) / Pkey(\freq_div),
        )));
});

a = Pseq(data1, 1).play;
b = Pseq(data2, 1).play;
c = Pseq(data3, 1).play;
d = Pseq(data5, 1).play;
e = Pseq(data6, 1).play;
f = Pseq(data7, 1).play;
)

(a.stop;
 b.stop;
 c.stop;
 d.stop;
 e.stop;
 f.stop;
)
