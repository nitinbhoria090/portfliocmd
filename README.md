# Nitin Bhoria — Developer Portfolio

A responsive React + Vite portfolio with Framer Motion animations, Lucide icons, and a client-side interactive command terminal.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally
```bash
# 1. Extract this project and open its folder in a terminal
cd nitin-aws-portfolio

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
The production-ready static site is generated in `dist/`.

## Personalize verified links
Edit `src/data.js`. Add only URLs and email addresses that you have checked:
```js
export const profile = {
  name: "Nitin Bhoria",
  role: "MERN Stack Developer",
  intro: "Your verified introduction.",
  github: "https://github.com/your-account",
  linkedin: "https://www.linkedin.com/in/your-profile/",
  email: "you@example.com",
  resume: "/resume.pdf"
};
```
Leave any value as an empty string to hide its link automatically. If you add a resume, place the PDF in `public/resume.pdf` and set `resume: "/resume.pdf"`.

## Update project details
Edit the `projects` array in `src/data.js`. Add only features, technologies, and outcomes that you can demonstrate. `otherProjects` is intentionally empty until additional verified projects are supplied.

## Command Center
Supported commands: `help`, `about`, `skills`, `projects`, `superpower`, `contact`, and `clear`. The terminal runs entirely in React state; it requires no backend or paid API.

## Accessibility and performance
- Semantic landmarks and labelled navigation/terminal input
- Keyboard-operable links, menu, and terminal form
- Visible focus styles and reduced-motion support
- Responsive CSS; no image downloads or runtime API calls
