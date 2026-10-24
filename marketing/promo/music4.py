# Soundtrack for the "Quiet Income" ad: 124 bpm deep house, sleek and warm. Soft chord stabs
# from the start, the groove from bar two, a gentle chime for every commission alert and a
# rising tick under the year of earnings. Everything is synthesised here.
# Usage: python3 music4.py <seconds> <out.wav> <cues.json>
import json
import sys
import wave

import numpy as np

SR = 44100
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 22.0
OUT = sys.argv[2] if len(sys.argv) > 2 else 'income.wav'
CUES = json.load(open(sys.argv[3]))
BEAT = 60 / CUES['bpm']
BAR = BEAT * 4
N = int(SR * DUR)
rng = np.random.default_rng(9)
L = np.zeros(N)
R = np.zeros(N)
END = CUES['end']
HITS = CUES['hits']


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



def stab(notes, length=0.5):
    # a soft electric-piano chord: sine partials with a bell edge, short and round
    t = tt(length)
    s = np.zeros(len(t))
    for m in notes:
        f = hz(m)
        s += np.sin(2 * np.pi * f * t) * np.exp(-t * 5) + 0.3 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t * 9) + 0.08 * np.sin(2 * np.pi * f * 7.1 * t) * np.exp(-t * 30)
    return s * (1 - np.exp(-t * 400)) / len(notes)


def sub(m, length):
    t = tt(length)
    s = np.sin(2 * np.pi * hz(m) * t) * np.minimum(1, t / 0.01) * np.exp(-t * 2.5)
    return np.tanh(s * 1.6) * 0.8


def hat(open_=False):
    t = tt(0.18 if open_ else 0.05)
    return band(rng.standard_normal(len(t)) * np.exp(-t * (18 if open_ else 90)), 7000, 15000) * (0.5 if open_ else 0.35)


def chime(m):
    t = tt(1.2)
    f = hz(m)
    return (np.sin(2 * np.pi * f * t) * np.exp(-t * 4) + 0.4 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 7) + 0.15 * np.sin(2 * np.pi * f * 3.0 * t) * np.exp(-t * 11)) * (1 - np.exp(-t * 500))


# F minor 9 -> Db maj9 -> Ab maj7 -> Eb6, warm and a little hopeful
CHORDS = [[53, 56, 60, 63, 67], [49, 53, 56, 60, 63], [56, 60, 63, 67], [51, 55, 58, 60]]
ROOTS = [29, 25, 32, 27]
s16 = BEAT / 4
nbars = int(np.ceil(DUR / BAR))
GROOVE = BAR  # the beat comes in on bar 1
for b in range(nbars):
    t0 = b * BAR
    ci = b % 4
    for st in (0, 3, 6, 10, 14):  # syncopated stabs
        if t0 + st * s16 < DUR:
            add(stab([n + 12 for n in CHORDS[ci]], 0.45), t0 + st * s16, pan=0.2 if st % 2 else -0.2, gain=0.2)
    add(pad(CHORDS[ci], BAR), t0, gain=0.16)
    if t0 < GROOVE or t0 >= END + BAR * 1.5:
        continue
    for beat in range(4):
        at = t0 + beat * BEAT
        add(kick(), at, gain=0.8)
        add(hat(True), at + BEAT / 2, pan=0.3, gain=0.3)
        if beat in (1, 3):
            add(clap(), at, gain=0.3)
    for st in range(16):
        if st % 2:
            add(hat(), t0 + st * s16, pan=-0.35, gain=0.22)
    for st, ln in ((0, 0.35), (3, 0.2), (8, 0.3), (11, 0.2), (14, 0.15)):
        add(sub(ROOTS[ci] + 12, ln + 0.1), t0 + st * s16, gain=0.5)

# the hook lands softly; scene changes get a whoosh and a gentle impact
for at in HITS:
    add(whoosh(0.4), at - 0.4, pan=-0.15, gain=0.2)
    add(impact(0.45), at, gain=0.2)
# the year of earnings: rising ticks as each month's bar grows
r0, r1 = CUES['roll']
for i in range(12):
    at = r0 + 0.5 + i * (BAR * 1.6 / 12)
    add(chime(84 + [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19][i]), at, pan=-0.5 + i / 11, gain=0.07)
# commission alerts: a two-note chime for each
for i in range(6):
    at = r1 + 0.15 + i * BEAT * 0.75
    add(chime(88), at, pan=0.3, gain=0.08)
    add(chime(95), at + 0.07, pan=0.3, gain=0.07)
add(impact(0.9), END, gain=0.3)
add(riser(BAR), END - BAR, gain=0.1)
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
