# **App Name**: B12 Insight

## Core Features:

- B12 Info Display: Display detailed information about Vitamin B12, its biological role, importance, and recommended dosage based on age.
- Source Categorization: Present a categorized list of Vitamin B12 sources, including animal sources, plant-based sources, and supplements.
- Symptom Checker: A tool for users to answer questions about their symptoms and receive a probability assessment for B12 deficiency.

## Style Guidelines:

- Soft pastel color palette including light blues, soft yellows, and greens for a healthy, friendly, wellness vibe.
- Lots of white space to create a modern, clean, and minimalistic design.
- Accent color: A muted coral (#F08080) to highlight key sections and calls to action, complementing the pastel palette.
- Playful but professional font that is readable but stylish.
- Emphasis on illustrations (like vitamin molecules, foods, health symbols) more than stock photos.
- Subtle animations when scrolling (fade-ins, parallax effects, micro-interactions).
- Light and dark mode toggle option for accessibility.
- Smooth page transitions (like Framer Motion or Next.js styled transitions).

## Original User Request:
B12Life — Your Guide to Understanding Vitamin B12 and Living Better

1. Overall Aesthetic
Modern, clean, and minimalistic design with lots of white space.

Soft pastel color palette (like light blues, soft yellows, and greens) to give a healthy, friendly, wellness vibe.

Use a unique and slightly playful but professional font (suggested fonts: Poppins, Quicksand, Nunito, or custom typography that is readable but stylish).

Subtle animations when scrolling (fade-ins, parallax effects, micro-interactions).

Light and dark mode toggle option for accessibility.

Emphasis on illustrations (like vitamin molecules, foods, health symbols) more than stock photos.

Smooth page transitions (like Framer Motion or Next.js styled transitions).

2. User Authentication
Simple Login/Sign-up system:

Via Email + Password

Optionally via Google (OAuth).

Minimal UI: clean sign-up forms, error feedback in real time.

After login: user can access their profile page and community section.

3. Pages (Multipage Structure)

Page Name	Description
Home	Catchy intro about importance of Vitamin B12, overview of deficiency epidemic, call-to-action to explore more.
About B12	Detailed info about Vitamin B12: What it is, Biological Role, Importance, Recommended Dosage (age-wise).
Sources of B12	Categorized list: Animal sources, Plant-based sources (fortified), Supplements (oral, injections).
Symptoms & Deficiency	Categorized Symptoms: Neurological, Physical, Mental, Long-term Effects. Include a "symptom checker" tool later.
Real Stories	Patient case studies shared by users: Success stories, struggles, recoveries. Visual timeline or story cards.
Community	Centralized open chat/comments area where users can discuss, ask questions, and reply (NOT direct messaging).
My Profile	Each user can: View and edit bio, upload a profile picture, write and manage their own story submission.
Resources	Blog-style articles, doctor's advice, downloadable PDFs, videos about Vitamin B12 and health.
Contact	Support email, general inquiry form, FAQs.
Legal	Terms of Service, Privacy Policy.
4. Community Features
A centralized chat room (not private DMs) where:

People can post questions, experiences, tips.

Others can comment/reply.

Like/upvote useful comments.

Real-time updates (WebSocket or Polling).

Proper moderation features (report post, block spam).

5. Unique Features
User Story Portal:

Users can submit their own B12 deficiency journey.

Title, story content, option to add images (like their reports, foods they ate, etc.).

Admin/mod approval before stories go live.

Readers can "heart" or "thank" a story.

Categories & Filters:

Search symptoms by age group, diet type (vegan, vegetarian, omnivore), etc.

Filters for case studies (e.g., "Neurological symptoms", "Success after supplements").

Gamification (optional for later):

Badges for active users (like "First Story Posted", "Top Commenter").

Accessibility:

Text resizing options.

Proper contrast ratios.

Easy navigation for screen readers.

6. Tech Stack Suggestion
(If you want to suggest to a developer or agency):

Frontend: React.js + Tailwind CSS

Backend: Node.js (Express) or Next.js fullstack

Database: MongoDB (for user profiles, posts, stories)

Authentication: Firebase Auth or Auth0

Real-time Chat: Socket.io or Firebase Realtime DB

Hosting: Vercel or Netlify

CMS for Blog Posts: Sanity.io or Contentful

7. SEO & Performance
SEO-optimized (meta tags, OpenGraph images for stories).

Super-fast page loading (use image optimization, lazy loading).

Mobile-first responsive design (works beautifully on all devices).

8. Future Upgrades (optional ideas)
Symptom Checker Bot: Users answer a few questions and get a probability rating for B12 deficiency.

Newsletter signup: Weekly tips and stories in email.

Doctor Interviews: Video content featuring doctors discussing B12 importance.

Tone of Website
Friendly, empowering, scientific but accessible.
No medical jargon without explanation.
Focus on making people feel understood, educated, and hopeful.
  