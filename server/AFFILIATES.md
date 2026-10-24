# Affiliate programme

Anyone in Kenya aged 18 or over can apply in the app (**Plans → Earn with CBC Helper**, or
the parents' page). You approve each application, affiliates share a code or link, and they
earn on what the parents they bring in pay.

| | Rate |
|---|---|
| A parent's first payment, any plan | 10% |
| Each later payment on the Weekly plan | 14% |
| Each later payment on a monthly plan (Standard, Pro, Super Pro) | 16% |
| How long renewals earn | 365 days from the parent's first payment |
| Waiting period before a commission can be paid | 7 days |
| Minimum payout | KSh 500 |

Change any of these in `affiliate.json`; the app reads the same file when it is built.

## How a parent is credited

- A parent is their **M-Pesa number** (the app has no parent accounts yet).
- A code counts only on a number that has **never paid before**. After that, every payment
  from that number belongs to the same affiliate for a year, with or without the code.
- An affiliate cannot earn on their own number. Pending, rejected and suspended affiliates
  earn nothing.
- Parents arrive with `?ref=CODE` on the link (kept on their phone for 30 days) or type the
  code at checkout.

## Running it

Set `ADMIN_TOKEN` (a long random string) on the payments server, then open
`https://<your payments server>/admin` and enter it. From there you can:

- approve or reject applications (you see the name, ID number, date of birth and M-Pesa number);
- see each affiliate's commissions, and void one if a payment was reversed or was fraud;
- record a payout. Send the payable amount by M-Pesa (Send Money or B2C), then enter the
  M-Pesa receipt with **Paid out**;
- issue a new key to an affiliate who lost theirs.

Affiliates sign in with a private key shown once when they apply; the server keeps only
its hash. Data lives in `data/affiliates.json`, `referrals.json`, `commissions.json` and
`payouts.json`; back these up with `payments.json`.

## Before launch

These are not legal or tax advice; check them with a lawyer or accountant.

- **Data protection.** You collect national ID numbers and phone numbers. Register as a data
  controller with the Office of the Data Protection Commissioner and publish a privacy notice.
- **Tax.** Commissions you pay may need withholding tax and records for KRA. Ask an
  accountant how to treat them.
- **Automatic payouts.** Paying straight from the server needs M-Pesa B2C, which Safaricom
  approves separately. Until then, payouts are sent by hand and recorded on the admin page.
