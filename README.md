# Education Consultancy Website

Next.js 16 (App Router, TypeScript, Tailwind CSS 4) site for an education consultancy. Students browse courses and partner colleges and send an enquiry. Enquiries are saved to Google Sheets and emailed to the agency through Google Apps Script. Hosting target: Netlify free plan.

## Run locally

```bash
npm install
cp .env.example .env.local    # then fill in the values you have
npm run dev                   # http://localhost:3000
```

Other commands: `npm run lint`, `npm run build`, `npm start`.

## What to edit

| To change | Edit |
| --- | --- |
| Agency name, phone, email, address, WhatsApp, social links | `.env.local` (and Netlify variables in production) |
| Courses | `src/data/courses.ts` |
| Colleges (replace the sample data) | `src/data/colleges.ts` |
| About, mission, vision wording | `src/components/About.tsx` |
| Why Choose Us list | `src/components/WhyChooseUs.tsx` |
| Colours and fonts | `src/app/globals.css` |

The colleges in `src/data/colleges.ts` are **sample data**, shown with a "Sample data" badge. Replace them with verified details and remove `isSample: true`.

## How the enquiry works

1. The form (`src/components/EnquiryForm.tsx`) validates in the browser using `src/lib/validation.ts`.
2. It posts to `/api/enquiry` (`src/app/api/enquiry/route.ts`), which applies a rate limit, checks the hidden honeypot field, and validates everything again with the same rules.
3. The server sends the cleaned data to the Google Apps Script Web App (`src/lib/appsScript.ts`).
4. `apps-script/Code.gs` saves a row to the private Google Sheet and emails the agency.
5. The visitor sees success only after steps 3 and 4 both succeed.

Setup for the sheet and script: see `docs/GOOGLE_SHEETS_SETUP.md`.

Security notes:

- `GOOGLE_APPS_SCRIPT_URL` and `APPS_SCRIPT_SECRET` are server-only and never reach the browser.
- The rate limit (5 enquiries per 10 minutes per IP) is kept in server memory. On Netlify's serverless functions it slows spam but is not a hard guarantee.
- HTTPS protects data in transit. It does not by itself protect the form, which is why the server validates, limits and filters requests too.

## Deploy to Netlify

1. Push the project to a GitHub repository. Do not commit `.env.local`.
2. In Netlify: **Add new site > Import an existing project**, choose the repository. Netlify detects Next.js; the build command is `npm run build` (already in `netlify.toml`).
3. Before the first deploy, add the environment variables from `.env.example` under **Site configuration > Environment variables**. At minimum: `NEXT_PUBLIC_AGENCY_NAME`, `NEXT_PUBLIC_SITE_URL` (your `*.netlify.app` address), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `GOOGLE_APPS_SCRIPT_URL`, `APPS_SCRIPT_SECRET`.
4. Deploy. Netlify gives a free `*.netlify.app` address with HTTPS.
5. If you change a variable later, trigger a new deploy so it takes effect.

Netlify's free plan has usage limits and commercial-use terms. Check the current terms for your situation.

## Checklist after deploying

- [ ] The address starts with `https://` and shows a padlock.
- [ ] Submit a real enquiry: a row appears in the sheet and the email arrives.
- [ ] Submit with a bad mobile number and an empty form: clear error messages appear.
- [ ] On a phone: no sideways scrolling, menu opens, buttons are easy to tap.
- [ ] `/colleges`: search, location filter and course filter all work.
- [ ] WhatsApp buttons open a chat with the right number and a prefilled message.
- [ ] `/sitemap.xml` and `/robots.txt` load and use your real address.

## Not included

User accounts, admin dashboard, database server, admission tracking, payments, custom domain and ongoing maintenance.

## Still needed from the agency

Verified agency name, phone, email, WhatsApp number, address and social links, the real college and course list, final wording for About, Mission and Vision, and a logo if there is one. Add local business structured data and a social sharing image only once these are verified.
