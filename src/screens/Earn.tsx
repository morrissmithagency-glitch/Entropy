import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { applyAsAffiliate, earnings, loadDashboard, pct, planName, savedKey, saveKey, shareLink, TERMS, type Dashboard } from '../billing/affiliate'
import { TEST_MODE } from '../billing/mpesa'
import { ksh, normalisePhone, PLANS } from '../billing/plans'
import { NatureScene } from '../components/NatureScene'
import { Chip, TopBar } from '../components/ui'
import './plans.css'
import './earn.css'

const shortDate = (t: number) => new Date(t).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })

const RULES = [
  `You are ${TERMS.minAge} or older and hold a Kenyan national ID.`,
  'Talk to parents and guardians only. Never contact children or share your code with them.',
  'Say only what is true. Never promise marks, exam results or anything CBC Helper does not do.',
  'No spam, no fake accounts, and no paying with your own number to earn on yourself.',
  `A parent stays yours for ${Math.round(TERMS.renewalDays / 30)} months from their first payment.`,
  `Earnings wait ${TERMS.holdDays} days, then are paid by M-Pesa once a month when you have at least ${ksh(TERMS.minPayout)}. Reversed or dishonest payments earn nothing.`,
  'You are responsible for any tax on your earnings. CBC Helper may suspend anyone who breaks these rules.',
]

export function Earn() {
  const go = useNav()
  const [key, setKey] = useState(savedKey)
  const [fresh, setFresh] = useState<string | null>(null)

  const signIn = (k: string) => {
    saveKey(k)
    setKey(k)
  }

  return (
    <main className="earn plans">
      <section className="plans-hero">
        <NatureScene id="savanna-dawn" dim={0.2} />
        <div className="plans-veil" />
        <TopBar onBack={() => go({ name: 'home' })} title={<span className="eyebrow">Affiliates</span>} />
        <div className="plans-title gutter">
          <h1 className="display">Earn with CBC Helper</h1>
          <p>
            Share CBC Helper with parents you know. When they pay for a plan, you earn {pct(TERMS.firstRate)}, then up to {pct(TERMS.renewalRate.month)} every time they renew.
          </p>
        </div>
      </section>

      <div className="plans-body gutter">
        {key ? (
          <Dash
            k={key}
            fresh={fresh}
            onSignOut={() => {
              saveKey(null)
              setKey('')
              setFresh(null)
            }}
          />
        ) : (
          <>
            <HowItWorks />
            <Apply
              onDone={(k) => {
                setFresh(k)
                signIn(k)
              }}
              onKey={signIn}
            />
          </>
        )}
      </div>
    </main>
  )
}

function HowItWorks() {
  return (
    <>
      <ol className="earn-steps">
        {[
          ['Apply', `Anyone in Kenya aged ${TERMS.minAge} or over can apply with their ID and M-Pesa number. We check every application.`],
          ['Share your code', 'Once approved, share your link or code with parents. They enter it when they pay.'],
          ['Get paid by M-Pesa', `Earn on their first payment and on every renewal for a year. Paid monthly from ${ksh(TERMS.minPayout)}.`],
        ].map(([t, d], i) => (
          <motion.li key={t} className="glass" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}>
            <span className="earn-n display">{i + 1}</span>
            <span>
              <strong>{t}</strong>
              <span>{d}</span>
            </span>
          </motion.li>
        ))}
      </ol>

      <section className="earn-table glass">
        <h2 className="display">What you earn per parent</h2>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Parent pays</th>
              <th>First payment ({pct(TERMS.firstRate)})</th>
              <th>Each renewal</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map((p) => {
              const e = earnings(p)
              return (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>
                    {ksh(p.price)} <small>/ {p.period}</small>
                  </td>
                  <td>{ksh(e.first)}</td>
                  <td>
                    {ksh(e.renewal)} <small>({pct(TERMS.renewalRate[p.period])})</small>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="earn-fine">
          A parent who renews Pro every month for a year earns you {ksh(earnings(PLANS.find((p) => p.id === 'pro')!).first + 11 * earnings(PLANS.find((p) => p.id === 'pro')!).renewal)}.
        </p>
      </section>

      <section className="earn-rules glass">
        <h2 className="display">The rules</h2>
        <ul>
          {RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>
    </>
  )
}

function Apply({ onDone, onKey }: { onDone: (key: string) => void; onKey: (key: string) => void }) {
  const [f, setF] = useState({ name: '', idNumber: '', dob: '', phone: '', agree: false })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [haveKey, setHaveKey] = useState(false)
  const [keyIn, setKeyIn] = useState('')
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: k === 'agree' ? e.target.checked : e.target.value })

  const submit = async () => {
    const phone = normalisePhone(f.phone)
    if (f.name.trim().split(/\s+/).length < 2) return setError('Enter your full name as it is on your ID.')
    if (!/^\d{7,8}$/.test(f.idNumber.trim())) return setError('Enter your national ID number (7 or 8 digits).')
    if (!f.dob) return setError('Enter your date of birth.')
    if (!phone) return setError('Enter your Safaricom number like 0712 345 678.')
    if (!f.agree) return setError('Please agree to the rules above.')
    setError('')
    setBusy(true)
    sfx.select()
    try {
      const { key } = await applyAsAffiliate({ ...f, phone, idNumber: f.idNumber.trim() })
      sfx.correct()
      onDone(key)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const today = new Date()
  const latest = new Date(today.getFullYear() - TERMS.minAge, today.getMonth(), today.getDate()).toISOString().slice(0, 10)

  return (
    <section className="earn-apply glass">
      <h2 className="display">Apply to join</h2>
      <label className="co-field">
        <span className="co-label">Full name (as on your ID)</span>
        <input className="co-phone earn-input" autoComplete="name" value={f.name} onChange={set('name')} />
      </label>
      <div className="earn-two">
        <label className="co-field">
          <span className="co-label">National ID number</span>
          <input className="co-phone earn-input" inputMode="numeric" value={f.idNumber} onChange={set('idNumber')} />
        </label>
        <label className="co-field">
          <span className="co-label">Date of birth</span>
          <input className="co-phone earn-input" type="date" max={latest} value={f.dob} onChange={set('dob')} />
        </label>
      </div>
      <label className="co-field">
        <span className="co-label">M-Pesa number (where we send your earnings)</span>
        <input className="co-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0712 345 678" value={f.phone} onChange={set('phone')} />
      </label>
      <label className="earn-agree">
        <input type="checkbox" checked={f.agree} onChange={set('agree')} />
        <span>I am {TERMS.minAge} or older and I agree to the rules above.</span>
      </label>
      {error && <p className="co-error">{error}</p>}
      <button type="button" className="btn primary sheet-go" disabled={busy} onClick={() => void submit()}>
        {busy ? 'Sending…' : 'Apply'}
      </button>
      <p className="sheet-note">We use your ID only to check your age and identity, and your number only to pay you.</p>
      {TEST_MODE && (
        <p className="co-test">
          <strong>Test mode.</strong> Nothing is sent; your application stays on this device.
        </p>
      )}

      <div className="earn-key">
        {!haveKey ? (
          <button type="button" className="btn quiet" onClick={() => setHaveKey(true)}>
            Already applied? Open with your key
          </button>
        ) : (
          <div className="earn-key-row">
            <input className="co-phone earn-input" placeholder="Your affiliate key" value={keyIn} onChange={(e) => setKeyIn(e.target.value.trim())} />
            <button type="button" className="btn primary" disabled={keyIn.length < 8} onClick={() => onKey(keyIn)}>
              Open
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

function Dash({ k, fresh, onSignOut }: { k: string; fresh: string | null; onSignOut: () => void }) {
  const [d, setD] = useState<Dashboard | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const load = useCallback(() => {
    setError('')
    loadDashboard(k).then(setD, (e: Error) => setError(e.message))
  }, [k])
  useEffect(load, [load])

  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(what)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      /* the text is on screen to copy by hand */
    }
  }

  if (error)
    return (
      <section className="earn-apply glass">
        <h2 className="display">Could not open your account</h2>
        <p className="co-error">{error}</p>
        <div className="earn-key-row">
          <button type="button" className="btn primary" onClick={load}>
            Try again
          </button>
          <button type="button" className="btn quiet" onClick={onSignOut}>
            Use a different key
          </button>
        </div>
      </section>
    )
  if (!d) return <p className="plans-fine">Loading…</p>

  const link = shareLink(d.code)
  const message = `CBC Helper makes CBC practice fun, from PP1 to Grade 9: every learning area, short lessons, and Kobe the tortoise cheering children on. Try it here: ${link} (use my code ${d.code} when you pay)`

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <AnimatePresence>
        {fresh && (
          <motion.section className="earn-fresh glass" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <h2 className="display">Application sent</h2>
            <p>
              This is your private key. It opens this page on any phone. <strong>Save it now</strong> (a screenshot is fine): we cannot show it again.
            </p>
            <code className="earn-code-box">{fresh}</code>
            <button type="button" className="btn" onClick={() => void copy(fresh, 'key')}>
              {copied === 'key' ? 'Copied' : 'Copy key'}
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="earn-me glass">
        <div className="earn-me-head">
          <span>
            <span className="eyebrow">Hello, {d.name.split(' ')[0]}</span>
            <span className={`earn-status ${d.status}`}>{{ pending: 'Waiting for approval', approved: 'Approved', rejected: 'Not approved', suspended: 'Suspended' }[d.status]}</span>
          </span>
          <button type="button" className="btn quiet earn-out" onClick={onSignOut}>
            Sign out
          </button>
        </div>
        {d.status === 'pending' && <p className="earn-note">We are checking your details. Your code starts earning as soon as you are approved.</p>}
        {d.status === 'rejected' && <p className="earn-note">Your application was not approved. Contact CBC Helper if you think this is a mistake.</p>}
        {d.status === 'suspended' && <p className="earn-note">Your account is paused, so new payments do not earn. Contact CBC Helper to talk about it.</p>}

        <div className="earn-code">
          <span className="co-label">Your code</span>
          <span className="display">{d.code}</span>
        </div>
        <div className="earn-share">
          <button type="button" className="btn" onClick={() => void copy(link, 'link')}>
            {copied === 'link' ? 'Link copied' : 'Copy link'}
          </button>
          <a className="btn primary mpesa" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
            Share on WhatsApp
          </a>
        </div>
        <p className="earn-link">{link}</p>
      </section>

      <div className="earn-stats">
        <Chip>{d.parents} parent{d.parents === 1 ? '' : 's'}</Chip>
        <Stat label={`Waiting ${TERMS.holdDays} days`} value={d.balance.held} />
        <Stat label="Ready to pay" value={d.balance.payable} gold />
        <Stat label="Paid to you" value={d.balance.paid} />
      </div>
      <p className="plans-fine">
        {d.balance.payable >= TERMS.minPayout
          ? `${ksh(d.balance.payable)} goes to your M-Pesa in the next monthly payout.`
          : `Payouts are monthly once you have ${ksh(TERMS.minPayout)} ready.`}
      </p>

      <section className="earn-list glass">
        <h2 className="display">Earnings</h2>
        {d.commissions.length === 0 ? (
          <p className="earn-note">Nothing yet. Share your link with a few parents to get started.</p>
        ) : (
          <ul>
            {d.commissions.map((c, i) => (
              <li key={i}>
                <span>
                  <strong>{planName(c.plan)}</strong> · {c.kind === 'first' ? 'first payment' : 'renewal'} · {c.parent}
                  <small>
                    {shortDate(c.at)} · {pct(c.rate)} of {ksh(c.amount)} · {c.status === 'held' ? 'waiting' : c.status === 'payable' ? 'ready' : c.status}
                  </small>
                </span>
                <span className="earn-amt">{ksh(c.commission)}</span>
              </li>
            ))}
          </ul>
        )}
        {d.payouts.length > 0 && (
          <>
            <h3 className="earn-sub">Payouts</h3>
            <ul>
              {d.payouts.map((p) => (
                <li key={p.receipt}>
                  <span>
                    {shortDate(p.at)}
                    <small>M-Pesa {p.receipt}</small>
                  </span>
                  <span className="earn-amt">{ksh(p.total)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </motion.div>
  )
}

function Stat({ label, value, gold }: { label: string; value: number; gold?: boolean }) {
  return (
    <div className={`earn-stat glass ${gold ? 'gold' : ''}`}>
      <span className="display">{ksh(value)}</span>
      <span>{label}</span>
    </div>
  )
}

