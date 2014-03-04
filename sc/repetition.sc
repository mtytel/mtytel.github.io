(s.boot)
(
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
  var basefreq = 400, complexity = 6, voices = [], basefreqs, songseed, seeds;
  basefreqs = [75, 75, 300, 300, 300, 600, 600, 600, 1200, 1200];
  songseed = 1000000.rand;
  thisThread.randSeed = songseed;
  seeds = [];
  100.do({ seeds = seeds.add(1000000.rand); });
  i = 0;
  r = 4;

  voices = [];
  basefreqs.do({|freq|
    var voicemeasures = [];
    seeds.do({|seed|
      var measurelength, key;
      thisThread.randSeed = seed;
      k = complexity.rand + 1;
      key = k / max(1, k + 3.rand - 1);
      measurelength = 4.rand + 1;

      voicemeasures = voicemeasures.add(
        Pstutter(r, Pfindur(measurelength,
          Pseed(seed + i,
            Pbind(
              \numerator, Pwhite(1, complexity),
              \denominator, Pwhite(1, complexity),
              \amp, Pwhite(0.05, 0.2),
              \dur, 1 / (2 ** Pwhite(-1, 4)),
              \legato, Pwhite(0.01, 0.3),
              \instrument, \krgn_gen_fmdevil,
              \index, Pwhite(0, 3),
              \freq, Pkey(\numerator) / Pkey(\denominator) * freq * key,
            )
          )
        ))
      );
    });
    voices = voices.add(Pseq(voicemeasures));
    i = i + 1;
  });

  songseed.postln;
  ~players = [];
  voices.do({|voice|
    ~players = ~players.add(voice.play);
  });
)
(
  ~players.do({|player|
    player.stop;
  });
  ~players = [];
)
