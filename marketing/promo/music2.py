# Soundtrack for "The Cartography of Learning", built from the film's own cues so every
# hit, footstep and swell lands on the picture. Everything is synthesised here.
#   a low drone, a wordless choir (additive voices shaped by vowel formants) moving from
#   D minor to a bright D major, an astrolabe ticking faster until it locks, deep booms with
#   glass shimmer on each hit, reversed swells into the big moments, and a small glass note
#   for every footprint of light.
# Usage: python3 music2.py <seconds> <out.wav> <cues.json>
import json
import sys
import wave

import numpy as np

SR = 44100
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 48.0
OUT = sys.argv[2] if len(sys.argv) > 2 else 'ethereal.wav'
CUES = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else None
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(23)
L = np.zeros(N)
R = np.zeros(N)

LOCK, BIG, FIN = CUES['lock'], CUES['big'], CUES['finale']


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def add(sig, at, pan=0.0, gain=1.0):
    i = int(at * SR)
    if i >= N or i + len(sig) <= 0:
        return
    if i < 0:
        sig, i = sig[-i:], 0
    sig = sig[: N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2)
    R[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2)


def band(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / hi) ** 8) * (1 - 1 / np.sqrt(1 + (f / max(lo, 1)) ** 8))
    return np.fft.irfft(X, len(x))


def env(n, a, r):
    e = np.ones(n)
    ai, ri = min(n, max(1, int(a * SR))), min(n, max(1, int(r * SR)))
    e[:ai] = np.sin(np.linspace(0, np.pi / 2, ai)) ** 2
    e[-ri:] *= np.cos(np.linspace(0, np.pi / 2, ri)) ** 2
    return e


def ramp(a, b):
    return np.clip((t - a) / (b - a), 0, 1)


# ── the drone: D, slow, breathing ────────────────────────────────────────────
drone = np.zeros(N)
for m, amp in ((26, 1.0), (38, 0.6), (45, 0.35)):  # D1, D2, A2
    for det in (-0.07, 0.0, 0.06):
        f = hz(m + det)
        for k in range(1, 14):
            drone += amp / k ** 1.6 * np.sin(2 * np.pi * f * k * t + rng.random() * 6.28)
breathe = 0.75 + 0.25 * np.sin(2 * np.pi * t / 7.3)
drone_env = ramp(0.0, 4.0) * (0.55 + 0.45 * ramp(LOCK, LOCK + 3))
drone_env *= 1 - 0.7 * ramp(FIN - 0.2, FIN + 0.6) + 0.5 * ramp(FIN + 0.6, FIN + 3)
add(band(drone, 20, 900) * breathe * drone_env * 0.05, 0)

# ── the choir ────────────────────────────────────────────────────────────────
VOWELS = {'oo': [(300, 1.0, 80), (870, 0.3, 90), (2240, 0.08, 120)], 'ah': [(730, 1.0, 90), (1090, 0.6, 100), (2440, 0.25, 140)], 'eh': [(530, 1.0, 80), (1840, 0.5, 120), (2480, 0.3, 140)]}


def choir(notes, start, end, vowel, gain, attack=1.6, release=2.2):
    n = int((end - start) * SR)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    form = VOWELS[vowel]
    for m in notes:
        for v in range(4):  # four singers on each note
            f0 = hz(m) * (1 + (rng.random() - 0.5) * 0.006)
            vib = 1 + 0.004 * np.sin(2 * np.pi * (4.6 + rng.random()) * tt + rng.random() * 6)
            phase = 2 * np.pi * f0 * np.cumsum(vib) / SR
            k = 1
            while f0 * k < 4200:
                fk = f0 * k
                a = sum(g / (1 + ((fk - fc) / bw) ** 2) for fc, g, bw in form) / k ** 0.6
                out += a * np.sin(k * phase + rng.random() * 6)
                k += 1
    out *= env(n, attack, release) / (len(notes) * 4)
    return out


SEGMENTS = [
    ([50, 57, 62, 65], 2.5, LOCK + 0.2, 'oo', 0.10),                      # Dm, hushed
    ([50, 57, 60, 64, 65, 69], LOCK, 22.6, 'ah', 0.16),                   # Dm9
    ([46, 53, 57, 62, 65, 69], 21.6, 30.6, 'ah', 0.16),                   # Bbmaj7
    ([43, 50, 58, 62, 65, 69], 29.6, 36.4, 'eh', 0.17),                   # Gm9
    ([45, 52, 57, 62, 64, 67], 35.6, BIG + 0.15, 'ah', 0.19),             # A7sus4, unresolved
    ([38, 50, 57, 62, 66, 69, 74], BIG, FIN + 1.2, 'ah', 0.3),            # D major, the arrival
    ([50, 57, 61, 64, 66, 69, 73], FIN + 0.3, DUR, 'oo', 0.2),            # Dmaj9, the end
]
for notes, a, b, vow, g in SEGMENTS:
    s = choir(notes, a, b, vow, g, attack=0.9 if a in (LOCK, BIG) else 1.8, release=1.6 if b < DUR else 3.5)
    add(s, a, pan=-0.15, gain=g * 0.9)
    add(np.roll(s, 900), a, pan=0.25, gain=g * 0.7)

# ── the astrolabe ticks faster and faster until it locks ─────────────────────
tk = 3.6
while tk < LOCK - 0.12:
    p = (tk - 3.6) / (LOCK - 3.6)
    n = int(0.05 * SR)
    click = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 260)
    click = band(click, 2500, 9000)
    ping = np.sin(2 * np.pi * 3100 * np.arange(n) / SR) * np.exp(-np.arange(n) / SR * 90) * 0.35
    add(click + ping, tk, pan=0.35 if int(tk * 10) % 2 else -0.35, gain=0.05 + 0.1 * p)
    tk += 0.5 * (1 - p) ** 1.4 + 0.07

# ── hits: a reversed swell in, a deep boom, a spray of glass ─────────────────


def boom(strength):
    n = int(3.5 * SR)
    tt = np.arange(n) / SR
    f = 32 + 40 * np.exp(-tt * 3.2)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 1.15)
    s = np.tanh(s * 2.2) * 0.8
    thump = band(rng.standard_normal(n) * np.exp(-tt * 28), 30, 220) * 3
    return (s + thump) * strength


def glass(strength, seed):
    r = np.random.default_rng(seed)
    n = int(4.5 * SR)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    for j in range(14):
        f = hz(r.choice([86, 88, 90, 93, 95, 98, 100, 102]))
        d = j * 0.018 + r.random() * 0.05
        part = np.zeros(n)
        for ratio, amp, dec in ((1, 1, 1.1), (2.76, 0.45, 2.5), (5.4, 0.22, 4.4), (8.9, 0.1, 7)):
            part += amp * np.sin(2 * np.pi * f * ratio * tt + r.random() * 6) * np.exp(-tt * dec)
        out += np.roll(part, int(d * SR)) * (0.6 + 0.4 * r.random())
    return out * strength / 14


def swell(length):
    n = int(length * SR)
    tt = np.arange(n) / SR
    x = rng.standard_normal(n)
    x = band(x, 400, 9000)
    e = (tt / length) ** 3.2
    tone = np.sin(2 * np.pi * np.cumsum(220 * 2 ** (tt / length * 1.5)) / SR) * e * 0.25
    return (x * e + tone) * np.concatenate([np.ones(n - int(0.03 * SR)), np.linspace(1, 0, int(0.03 * SR))])


for h in CUES['hits']:
    a, kind = h['a'], h['kind']
    if kind in ('lock', 'big', 'finale'):
        sw = swell(2.6 if kind == 'big' else 2.0)
        add(sw, h['t'] - len(sw) / SR, pan=-0.2, gain=0.09 * a)
    if kind == 'station':
        # the slab rising through the map: a whoosh that opens up, then a soft landing
        n = int(1.35 * SR)
        tt = np.arange(n) / SR
        x = rng.standard_normal(n)
        lo = band(x, 150, 900)
        hi = band(x, 900, 6000)
        k = tt / tt[-1]
        wh = (lo * (1 - k) + hi * k) * np.sin(np.pi * np.clip(k * 1.05, 0, 1)) ** 2
        add(wh, h['t'] - 1.25, pan=0.3, gain=0.07)
        add(boom(0.35), h['t'], gain=0.33)
        add(glass(1.0, int(h['t'] * 10)), h['t'], pan=0.4, gain=0.22)
    elif kind == 'final':
        add(glass(1.6, 4510), h['t'], gain=0.3)
    else:
        add(boom(a), h['t'], gain=0.55)
        add(glass(1.3 * a, int(h['t'] * 10)), h['t'], pan=-0.3, gain=0.32)
        add(glass(1.0 * a, int(h['t'] * 10) + 1), h['t'] + 0.04, pan=0.35, gain=0.28)

# a breath of silence right before the lock: everything ducks, then the boom
duck = 1 - 0.8 * ((t > LOCK - 0.4) & (t < LOCK)) * np.sin(np.pi * np.clip((t - (LOCK - 0.4)) / 0.4, 0, 1)) ** 0.5

# ── footprints: each one a small glass note and the faintest step ─────────────
PENT = [74, 77, 79, 81, 84, 86, 89, 91]  # D minor pentatonic, high
for i, pt in enumerate(CUES['prints']):
    n = int(1.6 * SR)
    tt = np.arange(n) / SR
    f = hz(PENT[(i * 3 + (i // 4)) % len(PENT)] + (12 if pt > BIG else 0))
    note = (np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.4) + 0.3 * np.sin(2 * np.pi * f * 2.76 * tt) * np.exp(-tt * 8)) * (1 - np.exp(-tt * 400))
    step = band(rng.standard_normal(int(0.06 * SR)) * np.exp(-np.arange(int(0.06 * SR)) / SR * 70), 60, 500)
    g = 0.05 if pt < 9 else 0.028
    add(note, pt, pan=0.45 if i % 2 else -0.45, gain=g)
    add(step, pt, gain=g * 1.2)

# ── a slow pulse under the journey, and sparkle in the air ───────────────────
beat = 60 / 66
b = CUES['unroll'] + 4.0
while b < BIG - 2.6:
    n = int(0.5 * SR)
    tt = np.arange(n) / SR
    add(np.sin(2 * np.pi * (48 + 20 * np.exp(-tt * 18)) * tt) * np.exp(-tt * 7), b, gain=0.12 * min(1, (b - 14) / 6))
    b += beat
for k in range(260):
    at = 10 + rng.random() * (DUR - 12)
    n = int(0.35 * SR)
    tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * (3000 + rng.random() * 4000) * tt) * np.exp(-tt * 14) * (1 - np.exp(-tt * 300))
    add(s, at, pan=rng.random() * 2 - 1, gain=0.006 + 0.008 * rng.random())

# ── space: a long, dark hall ─────────────────────────────────────────────────
mix_l, mix_r = L * duck, R * duck


def reverb(x, seed):
    r = np.random.default_rng(seed)
    n = int(6.0 * SR)
    tt = np.arange(n) / SR
    ir = r.standard_normal(n) * np.exp(-tt * 1.05)
    ir = band(ir, 80, 5500)
    ir[: int(0.025 * SR)] = 0
    ir /= np.sqrt((ir ** 2).sum())
    m = len(x) + n
    return np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[: len(x)]


wl, wr = reverb(mix_l, 1), reverb(mix_r, 2)
out_l = mix_l + 0.55 * wl
out_r = mix_r + 0.55 * wr
fade = np.clip(t / 0.6, 0, 1) * np.clip((DUR - t) / 1.6, 0, 1)
mix = np.stack([out_l, out_r], 1) * fade[:, None]
mix /= np.abs(mix).max()
mix = np.tanh(mix * 1.25) / np.tanh(1.25) * 0.9
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('wrote', OUT)
