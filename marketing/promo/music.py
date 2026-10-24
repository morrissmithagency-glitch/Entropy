# The film's soundtrack, synthesised so it is ours to use anywhere: a warm pad, a kalimba
# melody in D major pentatonic, paper rustling as the map unrolls, and chimes on the big moments.
# Usage: python3 music.py <seconds> <out.wav>
import sys, wave
import numpy as np

SR = 44100
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 37.0
OUT = sys.argv[2] if len(sys.argv) > 2 else 'music.wav'
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)

def hz(note):  # midi number to frequency
    return 440.0 * 2 ** ((note - 69) / 12)

def add(sig, start, pan=0.0, gain=1.0):
    i = int(start * SR)
    if i >= N: return
    sig = sig[: N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt((1 - pan) / 2)
    R[i:i + len(sig)] += sig * np.sqrt((1 + pan) / 2)

def env(n, a, r):
    e = np.ones(n); ai = min(n, max(1, int(a * SR))); ri = min(n, max(1, int(r * SR)))
    e[:ai] = np.linspace(0, 1, ai) ** 2
    e[-ri:] *= np.linspace(1, 0, ri) ** 2
    return e

def lowpass(x, k):
    # one-pole smoothing, k in (0,1): smaller is darker
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc += k * (x[i] - acc); y[i] = acc
    return y

def lowpass_fast(x, cutoff):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / cutoff) ** 4)
    return np.fft.irfft(X, len(x))

# ---- pad: four chords, each held two bars at 84 bpm ----
BEAT = 60 / 84; BAR = BEAT * 4
chords = [[50, 57, 62, 66, 69], [47, 54, 59, 62, 66], [43, 50, 55, 59, 62], [45, 52, 57, 61, 64]]  # D Bm G A
pad = np.zeros(N)
start = 2.2; k = 0
while start < DUR:
    ln = min(2 * BAR + 1.5, DUR - start)
    n = int(ln * SR); tt = np.arange(n) / SR
    s = np.zeros(n)
    for note in chords[k % 4]:
        for det in (-0.12, 0.0, 0.11):
            f = hz(note + det)
            s += np.sin(2 * np.pi * f * tt + rng.random() * 6) + 0.25 * np.sin(4 * np.pi * f * tt)
    s *= env(n, 1.4, 1.6) / 15
    i = int(start * SR); pad[i:i + n] += s
    start += 2 * BAR; k += 1
pad = lowpass_fast(pad, 1800)
swell = np.clip((t - 2.2) / 4, 0, 1) * (1 - 0.35 * np.clip((t - 31) / 1, 0, 1)) + 0.5 * np.clip((t - 31.6) / 1.5, 0, 1)
add(pad * swell * 0.55, 0)
# high airy shimmer under the opening line
air = lowpass_fast(rng.standard_normal(N), 5000) - lowpass_fast(rng.standard_normal(N), 2000)
add(air * 0.012 * np.clip(1 - np.abs(t - 1.8) / 2.6, 0, 1), 0)

# ---- kalimba ----
def kalimba(note, length=1.6):
    n = int(length * SR); tt = np.arange(n) / SR; f = hz(note)
    s = np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3.2)
    s += 0.35 * np.sin(2 * np.pi * f * 5.4 * tt) * np.exp(-tt * 18)   # the metallic tine overtone
    s += 0.15 * np.sin(2 * np.pi * f * 2 * tt) * np.exp(-tt * 6)
    s[: int(0.002 * SR)] *= np.linspace(0, 1, int(0.002 * SR))
    return s
scale = [62, 64, 66, 69, 71, 74, 76, 78, 81]   # D pentatonic
phrase = [0, 2, 4, 3, 5, 4, 2, 3,  1, 3, 5, 6, 5, 3, 4, 2,  0, 2, 4, 5, 7, 6, 4, 5,  3, 4, 6, 5, 4, 2, 1, 0]
step = BEAT / 2
t0 = 4.5; i = 0
while t0 < 30.6:
    if (i % 8) not in (3, 7) or i % 16 == 3:
        deg = phrase[i % len(phrase)] + (1 if (i // 32) % 2 else 0)
        add(kalimba(scale[min(deg, len(scale) - 1)]), t0, pan=0.25 * np.sin(i), gain=0.17 * (0.85 + 0.3 * rng.random()))
    # a soft bass pluck on each bar
    if i % 8 == 0:
        add(kalimba(chords[int((t0 - 2.2) // (2 * BAR)) % 4][0] - 12, 2.5), t0, gain=0.22)
    t0 += step; i += 1
# soft shaker on the off-beats once the journey is moving
for j in range(200):
    tt0 = 7.6 + j * step + step / 2
    if tt0 > 30.2: break
    n = int(0.08 * SR)
    s = rng.standard_normal(n) * np.exp(-np.arange(n) / SR * 60)
    s = s - lowpass(s, 0.3)
    add(s * 0.025 * min(1, (tt0 - 7.6) / 3), tt0, pan=0.4)

# ---- chimes ----
def bell(f, length=3.5):
    n = int(length * SR); tt = np.arange(n) / SR; s = np.zeros(n)
    for ratio, amp, dec in ((1, 1, 1.4), (2.76, 0.5, 2.6), (5.4, 0.25, 4.5), (8.93, 0.12, 7)):
        s += amp * np.sin(2 * np.pi * f * ratio * tt) * np.exp(-tt * dec)
    return s
def sparkle(at, count=9, base=88):
    for j in range(count):
        add(bell(hz(base + [0, 2, 4, 7, 9, 12, 14, 16, 19][j % 9])) * 0.05, at + j * 0.06, pan=-0.6 + j * 0.15)
sparkle(3.35)

# a little chime as each painted world blooms into colour (mirrors the film's camera)
PAN_A, PAN_B, RAMP, PAN_D = 7.6, 30.0, 1.6, 7270
def cam(x):
    T = PAN_B - PAN_A; v = PAN_D / (T - RAMP); s = x - PAN_A
    if s <= 0: return 0
    if s < RAMP: return v * s * s / (2 * RAMP)
    if s < T - RAMP: return v * RAMP / 2 + v * (s - RAMP)
    if s < T: r = T - s; return PAN_D - v * r * r / (2 * RAMP)
    return PAN_D
times = np.arange(0, DUR, 1 / 120)
for idx, m in enumerate(2150 + 1000 * np.arange(6)):
    sx = np.array([230 + m - cam(x) for x in times])
    hit = times[np.argmax(sx < 1500)]
    add(bell(hz([74, 76, 78, 81, 83, 86][idx])) * 0.08, hit, pan=0.3)
sparkle(31.7, 9, 86)
# closing chord rings out
n = int(5.5 * SR); tt = np.arange(n) / SR
fin = sum(np.sin(2 * np.pi * hz(x) * tt) * np.exp(-tt * 0.8) for x in (62, 66, 69, 74, 78)) / 5
add(lowpass_fast(fin, 3000) * 0.18, 31.7)

# ---- paper: rustle while the scroll first unrolls, then a quiet whisper as it keeps unfurling ----
paper = rng.standard_normal(N)
paper = lowpass_fast(paper, 3200) - lowpass_fast(paper, 700)
flutter = 0.6 + 0.4 * np.abs(lowpass_fast(rng.standard_normal(N), 18)) * 6
amt = np.clip((t - 4.4) / 0.2, 0, 1) * np.clip((7.2 - t) / 0.6, 0, 1) * 0.22
amt += np.clip((t - 7.6) / 1.5, 0, 1) * np.clip((30.2 - t) / 1, 0, 1) * 0.035
amt += np.clip(1 - np.abs(t - 3.6) / 0.3, 0, 1) * 0.12      # the ribbon slipping off
add(paper * flutter * amt, 0)

# ---- room: a light convolution reverb ----
ir_n = int(2.2 * SR)
ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / SR * 2.8)
ir = lowpass_fast(ir, 4000); ir /= np.sqrt((ir ** 2).sum())
def conv(x):
    m = len(x) + ir_n
    return np.fft.irfft(np.fft.rfft(x, m) * np.fft.rfft(ir, m), m)[: len(x)]
L = L + 0.32 * conv(L); R = R + 0.32 * conv(R)

fade = np.clip(t / 0.4, 0, 1) * np.clip((DUR - t) / 1.2, 0, 1)
mix = np.stack([L, R], 1) * fade[:, None]
mix = np.tanh(mix / np.abs(mix).max() * 1.1) * 0.89
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('wrote', OUT)
