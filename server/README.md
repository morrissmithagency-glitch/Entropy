# CBC Helper payments (M-Pesa)

A small Node server (no dependencies, Node 20+) that takes plan payments with M-Pesa
**STK Push** through Safaricom's Daraja API. The app sends the plan and phone number; the
server looks up the price in `plans.json`, sends the PIN prompt to the phone and tells the
app when Safaricom confirms the payment.

| Plan | Price | Period | Opens |
|---|---|---|---|
| Weekly | KSh 300 | 7 days | Every strand in one grade, 1 child |
| Standard | KSh 950 | 30 days | Every strand in one grade, 1 child |
| Pro | KSh 1,250 | 30 days | Every grade, up to 3 children |
| Super Pro | KSh 3,450 | 30 days | Every grade, up to 3 children, reports and printables (coming soon) |

To change a price, edit `plans.json`. The app reads the same file when it is built, so
rebuild the app after changing it.

## 1. Get Daraja keys

1. Sign up at <https://developer.safaricom.co.ke> and create an app with **Lipa na M-Pesa
   Online** (M-Pesa Express). The sandbox gives you test keys straight away; the test
   shortcode is `174379` and its passkey is shown on the simulator page.
2. For real money, apply to **Go Live** with your Paybill or Till number. Safaricom then
   emails the production passkey.

## 2. Deploy

Any host that runs Node works (Render, Railway, Fly.io, a small VPS). It must be reachable
over **HTTPS**, because Safaricom only calls HTTPS callback URLs.

```bash
cd server
npm start
```

Environment variables:

| Name | What it is |
|---|---|
| `MPESA_ENV` | `sandbox` (default) or `production` |
| `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET` | From your Daraja app |
| `MPESA_SHORTCODE` | Paybill number, or the store number for a Till |
| `MPESA_PASSKEY` | Lipa na M-Pesa Online passkey |
| `MPESA_TRANSACTION_TYPE` | `CustomerPayBillOnline` (default) or `CustomerBuyGoodsOnline` for a Till |
| `MPESA_PARTY_B` | Only for a Till: the till number (defaults to the shortcode) |
| `PUBLIC_URL` | This server's HTTPS address, e.g. `https://pay.cbchelper.co.ke` |
| `CALLBACK_SECRET` | A long random string; it hides the callback address |
| `ALLOWED_ORIGIN` | The app's address, e.g. `https://cbchelper.co.ke` (comma-separate several) |
| `PORT` | Defaults to 8787 |
| `ADMIN_TOKEN` | A long random string that opens `/admin`, where you approve affiliates and record payouts. See [AFFILIATES.md](AFFILIATES.md) |

Payments are kept in `server/data/payments.json` (affiliate records sit beside it). Put that folder on a disk that survives
restarts, and back it up: it is your record of who paid.

## 3. Point the app at it

Build the app with the server's address:

```bash
VITE_PAYMENTS_API=https://pay.cbchelper.co.ke npm run build
```

Without `VITE_PAYMENTS_API` the app runs in **test mode**: the checkout says so, the M-Pesa
prompt is acted out on screen, and no money moves. A number ending in `000` acts out a
cancelled payment.

## How a payment goes

1. `POST /api/pay` `{ plan, phone, grade? }` sends the STK prompt and returns its id.
2. The parent enters their PIN. Safaricom posts the result to
   `/api/mpesa/callback/<CALLBACK_SECRET>`.
3. The app polls `GET /api/pay/<id>` every few seconds. If the callback is late, the server
   asks Safaricom directly after 20 seconds, and gives up after 3 minutes.

The server only accepts a payment when the amount paid is at least the plan price.

## Before taking real money

* **Accounts.** A plan is stored on the device it was bought on. Parent accounts (phone
  number + PIN or OTP) are needed so a plan follows the family to a new phone, and so the
  "up to 3 children" limit can be counted. Until then, the server's payment record is the
  proof of purchase.
* **Data protection.** Phone numbers are personal data under Kenya's Data Protection Act
  2019. Register with the ODPC, say in a privacy notice why you keep them, and keep
  `payments.json` private.
* **Receipts and refunds.** Decide how parents reach you about a payment, and put that
  contact on the plans page.
