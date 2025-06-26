# Tech Stack
## FrontendV1: ReactJS
## FrontendV2: Next.js (React-based)
- Fast page loads with SSR or SSG.
- Easy routing for content/lessons
- Built-in API routes if needed
- Great SEO for public lessons/pages
- Component-based UI for interactive word popups, audio, vocab tracking
- Easily integrates with TailwindCSS or shadcn/ui for clean design

## Backend/APIV1: Node.js + Express
## Backend/APIV2: Next.js API routes
- For handling user auth, vocab tracking, lesson storage
- Scalable and familiar if you're coming from MERN

## Database: MongoDB (or PostgreSQL)
- MongoDB is great for flexibility (e.g., vocab, lesson data, custom fields)
- Strict relational structure (e.g., for quizzes/tests), consider PostgreSQL

## AuthV1: Passport.js (if using Express)
## AuthV1: NextAuth.js (for Next.js)
- Secure, simple, social login options

## Realtime/Live Interactions: Socket.IO or Pusher
- For syncing audio/text or live vocab updates
- Optional: server-sent events or WebSockets

## Hosting: Vercel (for frontend) + Render, Railway, or DigitalOcean (for backend)
- Vercel is perfect for Next.js with fast global performance

## Bonus Tools You’ll Likely Need:
### Audio streaming
Use AWS S3 or Cloudinary to store audio
### Text processing (e.g., word parsing)
Use Python/NLP microservice or Node.js libraries
### Email verification & onboarding
SendGrid or Resend
### Payments
Stripe
### User analytics
PostHog or Plausible
### Translations
DeepL API, Google Translate API