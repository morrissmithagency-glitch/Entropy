# Soundtrack for the "Kanga" ad: 120 bpm Afro-house. A marimba hook from the first second,
# a build under the question, then the drop: four-on-the-floor kick, a log-drum bassline,
# shakers and claps. Every scene change gets a whoosh and an impact; the copy that slams in
# on a beat gets a hit of its own. Everything is synthesised here.
# Usage: python3 music3.py <seconds> <out.wav> <cues.json>
import json
import sys
import wave

import numpy as np

SR = 44100
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 22.0
OUT = sys.argv[2] if len(sys.argv) > 2 else 'kanga.wav'
CUES = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else {'bpm': 120, 'bars': [i * 2.0 for i in range(10)], 'drop': 4.0, 'free': 16.0, 'end': 18.0}
BEAT = 60 / CUES['bpm']
BAR = BEAT * 4
N = int(SR * DUR)
rng = np.random.default_rng(9)
L = np.zeros(N)
R = np.zeros(N)
DROP, FREE, END = CUES['drop'], CUES['free'], CUES['end']


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def add(sig, at, pan=0.0, gain=1.0):
    i = int(round(at * SR))
    if i >= N or i < 0:
        return
    sig = sig[: N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2)
    R[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2)


def band(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / hi) ** 6) * (1 - 1 / np.sqrt(1 + (f / max(lo, 1)) ** 6))
    return np.fft.irfft(X, len(x))


def tt(sec):
    return np.arange(int(sec * SR)) / SR


def kick():
    t = tt(0.45)
    f = 45 + 110 * np.exp(-t * 32)
    return np.tanh(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * 2.4) * 0.9


def clap():
    t = tt(0.3)
    x = rng.standard_normal(len(t))
    e = np.zeros(len(t))
    for d in (0, 0.011, 0.023):
        e += np.exp(-np.maximum(t - d, 0) * 60) * (t >= d)
    e += np.exp(-t * 14) * 0.4
    return band(x * e, 900, 7000) * 0.7


def shaker(accent):
    t = tt(0.07)
    return band(rng.standard_normal(len(t)) * np.exp(-t * 70), 5000, 14000) * (0.55 if accent else 0.3)


def log_drum(m, length=0.42):
    # the amapiano "log drum": a sine that bends down into the note, saturated, with a woody click
    t = tt(length)
    f = hz(m) * (1 + 0.9 * np.exp(-t * 55))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5)
    s = np.tanh(s * 3.0) * 0.6 + 0.25 * np.sin(2 * np.pi * np.cumsum(f * 2) / SR) * np.exp(-t * 14)
    return s


def marimba(m, length=0.6):
    t = tt(length)
    f = hz(m)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 7) + 0.28 * np.sin(2 * np.pi * f * 3.93 * t) * np.exp(-t * 24) + 0.12 * np.sin(2 * np.pi * f * 9.2 * t) * np.exp(-t * 40)
    return s * (1 - np.exp(-t * 600))


def pad(notes, length):
    t = tt(length)
    s = np.zeros(len(t))
    for m in notes:
        for d in (-0.08, 0.0, 0.07):
            f = hz(m + d)
            for k in range(1, 8):
                s += np.sin(2 * np.pi * f * k * t + rng.random() * 6) / k ** 1.4
    s = band(s, 120, 2400)
    e = np.minimum(1, t / 0.3) * np.minimum(1, (length - t) / 0.4)
    return s * e / (len(notes) * 3)


def impact(strength=1.0):
    t = tt(1.6)
    boom = np.sin(2 * np.pi * np.cumsum(40 + 60 * np.exp(-t * 12)) / SR) * np.exp(-t * 3.2)
    crash = band(rng.standard_normal(len(t)) * np.exp(-t * 3.5), 3000, 15000) * 0.5
    return (np.tanh(boom * 2) + crash) * strength


def whoosh(length=0.5):
    t = tt(length)
    x = rng.standard_normal(len(t))
    k = t / length
    s = band(x, 300, 1500) * (1 - k) + band(x, 1500, 9000) * k
    return s * k ** 2.2 * 0.8


def riser(length):
    t = tt(length)
    x = band(rng.standard_normal(len(t)), 800, 10000) * (t / length) ** 2.5
    tone = np.sin(2 * np.pi * np.cumsum(300 * 2 ** (t / length * 2)) / SR) * (t / length) ** 2 * 0.3
    return x + tone


# A minor: Am7 - Fmaj7 - C - G, one chord per bar
CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 60], [55, 59, 62, 67]]
ROOTS = [33, 29, 36, 31]
# log drum pattern in sixteenths per bar: (step, semitone offset from root, length)
LOG = [(0, 0, 0.35), (3, 0, 0.2), (6, 12, 0.2), (8, 0, 0.35), (10, 7, 0.2), (13, 0, 0.3)]
HOOK = [69, 72, 76, 74, 72, 69, 67, 69]  # marimba, eighths
s16 = BEAT / 4
nbars = int(np.ceil(DUR / BAR))

for b in range(nbars):
    t0 = b * BAR
    ci = b % 4
    in_break = FREE <= t0 < FREE + BAR
    # marimba hook throughout (a lighter version in the intro)
    for i, m in enumerate(HOOK):
        at = t0 + i * BEAT / 2
        if at >= DUR:
            break
        if t0 < DROP and i % 2:
            continue
        add(marimba(m + (0 if ci in (0, 1) else -2 if ci == 3 else 0)), at, pan=0.3 if i % 2 else -0.25, gain=0.16)
    # pad
    if t0 >= BAR:
        add(pad(CHORDS[ci], BAR), t0, gain=0.22 if t0 >= DROP else 0.14)
    if t0 < DROP or in_break:
        continue
    for beat in range(4):
        at = t0 + beat * BEAT
        add(kick(), at, gain=0.85)
        if beat in (1, 3):
            add(clap(), at, pan=0.05, gain=0.42)
    for st in range(16):
        add(shaker(st % 4 == 2), t0 + st * s16, pan=0.45, gain=0.28)
    for st, off, ln in LOG:
        add(log_drum(ROOTS[ci] + 12 + off, ln + 0.15), t0 + st * s16, gain=0.42)

# the intro hits: "Homework." and "Again."
add(impact(0.55), BEAT * 1, gain=0.35)
add(impact(0.8), BEAT * 3, gain=0.42)
# the build under the question: a clap on each beat and a riser into the drop
for i in range(4):
    add(clap(), BAR + i * BEAT, gain=0.3 + 0.08 * i)
add(riser(BAR), BAR, gain=0.18)
for k in range(8):
    add(clap(), DROP - BEAT + k * BEAT / 8, gain=0.12 + 0.03 * k)
# scene changes: whoosh in, impact on the downbeat
for at in CUES['bars'][1:]:
    add(whoosh(0.45), at - 0.45, pan=-0.2, gain=0.3)
    add(impact(1.0 if at in (DROP, FREE, END) else 0.5), at, gain=0.42 if at in (DROP, FREE, END) else 0.25)
# "FREE" lands a beat and a half into its bar
add(impact(1.2), FREE + BEAT * 1.5, gain=0.5)
add(riser(BEAT * 1.4), FREE, gain=0.12)
# call to action pop at the end
add(impact(0.7), END + 1.1, gain=0.3)

# a short room and the master
def room(x, seed):
    r = np.random.default_rng(seed)
    n = int(1.2 * SR)
    ir = r.standard_normal(n) * np.exp(-np.arange(n) / SR * 4.5)
    ir = band(ir, 200, 7000)
    ir /= np.sqrt((ir ** 2).sum())
    m = len(x) + n
    return np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[: len(x)]


t = np.arange(N) / SR
out = np.stack([L + 0.18 * room(L, 1), R + 0.18 * room(R, 2)], 1)
out *= (np.clip(t / 0.05, 0, 1) * np.clip((DUR - t) / 0.8, 0, 1))[:, None]
out /= np.abs(out).max()
out = np.tanh(out * 1.6) / np.tanh(1.6) * 0.92
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((out * 32767).astype('<i2').tobytes())
print('wrote', OUT)
