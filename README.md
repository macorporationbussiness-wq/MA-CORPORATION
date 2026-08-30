# M.A. Corporation — MERN Stack Website

A complete full-stack MERN (MongoDB, Express, React, Node.js) platform for M.A. Corporation,
featuring a modern dark corporate UI, public pages, an admin dashboard, WhatsApp enrollment,
and an AI chatbot widget.

## Features
- **Public Pages:** Home, About, Courses (catalog + detail), Services, Why Choose Us, Team,
  Portfolios, Certificates, Admissions/Enroll, Contact (with Google Maps), Privacy, Terms.
- **Admin Dashboard:** Secure JWT login; manage Courses, Services, Team, Portfolios,
  Certificates, Inquiries (contact / course / admission / career), and Site Settings.
- **WhatsApp Enrollment:** Enroll Now / Admission forms open WhatsApp with the applicant's
  details pre-filled and also save the inquiry to the database.
- **AI Chatbot:** Floating widget powered by the OpenCode API (with a built-in keyword
  fallback when no API key is set).
- **Design:** Obsidian black (#0B0F19), slate cards (#1E293B), emerald (#10B981) CTAs,
  amber (#F59E0B) highlights, Inter / Plus Jakarta Sans typography, glassmorphism, responsive.
- **SEO:** robots.txt, sitemap.xml, meta description/keywords, Open Graph tags.

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt.
- Frontend: React 18, React Router, plain CSS design system, Axios.

## Prerequisites
- Node.js (v18+)
- MongoDB — either a local instance (`mongod`) or a MongoDB Atlas connection string.

## Setup
1. Install dependencies:
   ```bash
   npm install
   npm install --prefix client
   ```
2. Configure environment — edit `.env`:
   - `MONGO_URI` — your MongoDB connection string
   - `JWT_SECRET` — secret for admin JWT
   - `WHATSAPP_NUMBER` — company WhatsApp number (digits only, with country code)
   - `OPENCODE_API_KEY` (optional) — enables the live AI chatbot
3. Seed initial data (admin, courses, services, team, settings):
   ```bash
   npm run seed
   ```
   Default admin: `admin@macorporation.com` / `admin123`

## Running in Development
```bash
npm run dev
```
This runs the API on port 5000 and the React dev server on port 3000 (with proxy).

## Running in Production
```bash
npm run build      # builds the React client into client/build
npm start          # serves API + static client on port 5000
```

## Project Structure
```
/                backend (server.js, config, models, routes, seed.js)
/client          React frontend (src/pages, src/components, src/context)
```

## Notes
- The chatbot works in fallback mode without an API key. Add `OPENCODE_API_KEY` in `.env`
  to enable live responses via the OpenCode API.
- Google Maps embed is configured from Admin → Settings (paste the iframe HTML).
- Online payments and a student portal are scaffolded for future addition.
