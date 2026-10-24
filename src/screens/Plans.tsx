import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useNav } from '../App'
import { sfx } from '../audio/sfx'
import { checkCode, cleanCode, storedRef } from '../billing/affiliate'
import { requestPayment, paymentStatus, TEST_MODE } from '../billing/mpesa'
import { ksh, normalisePhone, PLANS, prettyPhone, type Plan } from '../billing/plans'
import { NatureScene } from '../components/NatureScene'
import { Sheet } from '../components/Sheet'
import { Breath, Icon, SettingsButtons, TopBar } from '../components/ui'
import { gradeOfArea, GRADES, type AreaId, type GradeId } from '../curriculum'
import { activePlan, setSubscription, useSubscription } from '../state/subscription'
import './plans.css'
import './earn.css'

const longDate = (t: number) => new Date(t).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long' })

export function Plans({ from }: { from?: AreaId }) {
  const go = useNav()
  const sub = useSubscription()
  const current = activePlan(sub)
  const [chosen, setChosen] = useState<Plan | null>(null)
  const back = () => go(from ? { name: 'map', area: from } : { name: 'home' })

  return (
    <main className="plans">
      <section className="plans-hero">
        <NatureScene id="golden-hills" dim={0.15} />
        <div className="plans-veil" />
        <TopBar onBack={back} title={<span className="eyebrow">Plans</span>} right={<SettingsButtons />} />
        <div className="plans-title gutter">
          <h1 className="display">Grow every strand</h1>
          <p>The first strand in every world is always free. A plan opens all the others, paid with <span className="nowrap">M-Pesa</span>.</p>
        </div>
      </section>

      <div className="plans-body gutter">
        {current && (
          <div className="plan-now glass">
            <span className="plan-now-mark">{Icon.check}</span>
            <span>
              {current.sub.family ? (
                <>
                  <strong>Family pass.</strong> Every grade and every strand is open on this device, always.
                </>
              ) : (
                <>
                  <strong>{current.name}</strong> is open{current.sub.grade ? ` for ${GRADES.find((g) => g.id === current.sub.grade)?.label}` : ''} until {longDate(current.sub.expiresAt)}.
                </>
              )}
              {current.sub.receipt && <span className="plan-now-receipt"> M-Pesa receipt {current.sub.receipt}</span>}
            </span>
          </div>
        )}

        <ul className="plan-list">
          {PLANS.map((plan, i) => (
            <motion.li key={plan.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              <button
                type="button"
                className={`plan glass ${plan.featured ? 'featured' : ''}`}
                onClick={() => {
                  sfx.select()
                  setChosen(plan)
                }}
              >
                <span className="plan-head">
                  <span className="plan-name display">{plan.name}</span>
                  {plan.featured && <span className="plan-tag">Most families</span>}
                </span>
                <span className="plan-pitch">{plan.pitch}</span>
                <span className="plan-price">
                  <span className="display">{ksh(plan.price)}</span>
                  <span className="plan-per">/ {plan.period}</span>
                </span>
                <span className="plan-perks">
                  {plan.perks.map((perk) => (
                    <span key={perk.text} className={perk.soon ? 'perk-soon' : ''}>
                      {perk.text}
                      {perk.soon && <em>Coming soon</em>}
                    </span>
                  ))}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="plans-fine">
          Plans don&rsquo;t renew by themselves: you pay again only when you choose to. Prices include all charges.
        </p>

        <button type="button" className="earn-invite glass" onClick={() => go({ name: 'earn' })}>
          <span>
            <strong>Earn with CBC Helper</strong>
            Know parents who would love this? Share your code and earn on every plan they pay for.
          </span>
          <span className="arrow" aria-hidden>
            →
          </span>
        </button>
      </div>

      <AnimatePresence>
        {chosen && (
          <Sheet onClose={() => setChosen(null)}>
            <Checkout plan={chosen} defaultGrade={from ? gradeOfArea(from).id : undefined} onDone={back} />
          </Sheet>
        )}
      </AnimatePresence>
    </main>
  )
}

type Step = { name: 'form' } | { name: 'sending' } | { name: 'waiting'; id: string; phone: string } | { name: 'done'; expiresAt: number; receipt: string | null } | { name: 'failed'; message: string }

const GIVE_UP_MS = 3.5 * 60_000

function Checkout({ plan, defaultGrade, onDone }: { plan: Plan; defaultGrade?: GradeId; onDone: () => void }) {
  const [step, setStep] = useState<Step>({ name: 'form' })
  const [grade, setGrade] = useState<GradeId>(defaultGrade ?? GRADES[0].id)
  const [phone, setPhone] = useState('')
  const [ref, setRef] = useState(storedRef)
  const [showRef, setShowRef] = useState(() => !!storedRef())
  const [refName, setRefName] = useState<string | null>(null)
  const [error, setError] = useState('')
  const started = useRef(0)

  const pay = async () => {
    const msisdn = normalisePhone(phone)
    if (!msisdn) {
      setError('Enter a Safaricom number like 0712 345 678.')
      return
    }
    setError('')
    sfx.select()
    setStep({ name: 'sending' })
    try {
      const id = await requestPayment({ plan: plan.id, phone: msisdn, grade: plan.allGrades ? undefined : grade, days: plan.days, ref: cleanCode(ref) || undefined })
      started.current = Date.now()
      setStep({ name: 'waiting', id, phone: msisdn })
    } catch (e) {
      setStep({ name: 'form' })
      setError((e as Error).message)
    }
  }

  // Show whose code it is, so a parent knows it was typed right.
  useEffect(() => {
    const code = cleanCode(ref)
    setRefName(null)
    if (code.length < 4) return
    let live = true
    const t = setTimeout(() => void checkCode(code).then((n) => live && setRefName(n)), 400)
    return () => {
      live = false
      clearTimeout(t)
    }
  }, [ref])

  // Poll the payment until M-Pesa answers.
  const waitingId = step.name === 'waiting' ? step.id : null
  useEffect(() => {
    if (!waitingId) return
    let live = true
    const tick = async () => {
      if (!live) return
      try {
        const s = await paymentStatus(waitingId)
        if (!live) return
        if (s.status === 'paid') {
          setSubscription({ plan: plan.id, grade: plan.allGrades ? undefined : grade, expiresAt: s.expiresAt, receipt: s.receipt, test: TEST_MODE || undefined })
          sfx.correct()
          setStep({ name: 'done', expiresAt: s.expiresAt, receipt: s.receipt })
          return
        }
        if (s.status === 'failed') {
          setStep({ name: 'failed', message: s.message })
          return
        }
      } catch {
        /* a dropped connection: keep waiting */
      }
      if (Date.now() - started.current > GIVE_UP_MS) {
        setStep({ name: 'failed', message: 'M-Pesa did not answer in time. If you got an M-Pesa message saying you paid, keep it: it is your receipt.' })
        return
      }
      setTimeout(tick, 2500)
    }
    const t = setTimeout(tick, 2500)
    return () => {
      live = false
      clearTimeout(t)
    }
  }, [waitingId, plan, grade])

  const gradeLabel = GRADES.find((g) => g.id === grade)?.label

  return (
    <div className="sheet-body checkout" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div key={step.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
          {(step.name === 'form' || step.name === 'sending') && (
            <>
              <div className="eyebrow">{plan.name} plan</div>
              <h2 className="display">
                {ksh(plan.price)} <span className="per">a {plan.period}</span>
              </h2>
              <p className="sheet-blurb">{plan.allGrades ? `Every grade, up to ${plan.children} children, for ${plan.days} days.` : `Every strand in one grade for ${plan.days} days.`}</p>

              {!plan.allGrades && (
                <fieldset className="co-field">
                  <legend>Which grade?</legend>
                  <div className="co-grades" role="radiogroup">
                    {GRADES.map((g) => (
                      <button key={g.id} type="button" role="radio" aria-checked={grade === g.id} className={`co-grade ${grade === g.id ? 'on' : ''}`} onClick={() => setGrade(g.id)}>
                        {g.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <label className="co-field">
                <span className="co-label">M-Pesa phone number</span>
                <input
                  className="co-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && void pay()}
                  aria-invalid={!!error}
                />
              </label>
              {showRef ? (
                <label className="co-field">
                  <span className="co-label">Referral code (optional)</span>
                  <input className="co-phone" autoCapitalize="characters" placeholder="e.g. AMIN482" value={ref} onChange={(e) => setRef(cleanCode(e.target.value))} />
                  {refName && <span className="co-ref-ok">Code from {refName}. Asante!</span>}
                </label>
              ) : (
                <button type="button" className="co-ref-toggle" onClick={() => setShowRef(true)}>
                  Have a referral code?
                </button>
              )}
              {error && <p className="co-error">{error}</p>}

              <button type="button" className="btn primary sheet-go mpesa" disabled={step.name === 'sending'} onClick={() => void pay()}>
                {step.name === 'sending' ? 'Sending to your phone…' : `Pay ${ksh(plan.price)} with M-Pesa`}
              </button>
              <p className="sheet-note">An M-Pesa prompt will appear on that phone. Enter your PIN there to finish.</p>
              {TEST_MODE && (
                <p className="co-test">
                  <strong>Test mode.</strong> No money is taken. Any number works; one ending in 000 acts out a cancelled payment.
                </p>
              )}
            </>
          )}

          {step.name === 'waiting' && (
            <div className="co-center">
              <span className="co-phone-art">
                <Breath size={96} color="rgba(241,207,135,.6)" />
                <svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="13" y="5" width="22" height="38" rx="5" />
                  <path d="M21 37h6" />
                </svg>
              </span>
              <h2 className="display">Check your phone</h2>
              <p className="sheet-blurb">
                Enter your M-Pesa PIN on <strong className="nowrap">{prettyPhone(step.phone)}</strong> to pay {ksh(plan.price)} to CBC Helper.
              </p>
              <p className="sheet-note">Waiting for M-Pesa…</p>
              <button type="button" className="btn quiet sheet-go" onClick={() => setStep({ name: 'form' })}>
                Use a different number
              </button>
            </div>
          )}

          {step.name === 'done' && (
            <div className="co-center">
              <span className="co-done">{Icon.check}</span>
              <h2 className="display">Asante!</h2>
              <p className="sheet-blurb">
                {plan.name} is open{plan.allGrades ? '' : ` for ${gradeLabel}`} until {longDate(step.expiresAt)}. Every strand is ready.
              </p>
              {step.receipt && <p className="sheet-note">M-Pesa receipt {step.receipt}</p>}
              <button type="button" className="btn primary sheet-go" onClick={onDone}>
                Back to learning
              </button>
            </div>
          )}

          {step.name === 'failed' && (
            <div className="co-center">
              <h2 className="display">Payment not finished</h2>
              <p className="sheet-blurb">{step.message}</p>
              <button type="button" className="btn primary sheet-go" onClick={() => setStep({ name: 'form' })}>
                Try again
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
