# Amit Gautam — Portfolio

> **Founder-turned-PM.** 5,000+ users · ₹2.5 Cr valuation · 18 months.

A production-ready static portfolio site built with plain HTML, CSS, and JavaScript. No frameworks, no CMS — just fast, portable, and yours to own.

---

## 📁 Project Structure

```
/
├── index.html          ← Main portfolio page (all sections)
├── style.css           ← All styles + CSS custom properties (theming)
├── script.js           ← Scroll animations, theme toggle, mobile menu, accordion
├── assets/
│   └── resume.pdf      ← ⚠️ REPLACE: Upload your actual resume here
└── README.md           ← This file
```

---

## 🚀 Running Locally

This is a static site — no build step required.

**Option 1 — VS Code Live Server (recommended)**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

**Option 2 — Python HTTP Server**
```bash
# Python 3
python -m http.server 8080

# Then open: http://localhost:8080
```

**Option 3 — Node.js serve**
```bash
npx serve .
```

---

## ✏️ Customization Guide

### 1. Update Your Resume
Replace the placeholder PDF:
```
assets/resume.pdf  ←  drop your actual resume PDF here
```
Both download buttons (`hero` and `contact` sections) automatically point to this path.

### 2. Update Your LinkedIn URL
Search for `linkedin.com/in/amitgautam` in `index.html` and replace **all 3 occurrences** with your actual LinkedIn URL:
```html
<!-- In the contact section and footer -->
href="https://linkedin.com/in/YOUR-ACTUAL-HANDLE"
```

### 3. Add Your Headshot
Find the avatar div in `index.html` (marked with a `<!-- REPLACE -->` comment):
```html
<!-- REPLACE: replace this div's content with an <img> tag -->
<div class="about-avatar" ...>
  AG  ← replace this
</div>
```
Replace `AG` with:
```html
<img src="assets/headshot.jpg" alt="Amit Gautam headshot" loading="lazy"
     style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
```
Then add your photo as `assets/headshot.jpg` (recommended: square crop, min 400×400px).

### 4. Update the Deployed URL
Replace `https://amitgautam.dev` in two `<meta>` tags inside `<head>`:
```html
<meta property="og:url" content="YOUR-ACTUAL-URL" />
<link rel="canonical" href="YOUR-ACTUAL-URL" />
```

### 5. Add GitHub Profile
In the `<footer>`, find:
```html
href="https://github.com/amitgautam"
```
Replace with your actual GitHub URL.

### 6. Add Coursework / GPA / Clubs (Education Section)
In `index.html`, find the education section and locate:
```html
<!-- TODO: Add relevant coursework, GPA, or clubs here when Amit provides them -->
```
Uncomment and fill in the example line below it.

### 7. Theming
All colors are CSS custom properties in `style.css`:
```css
:root {
  --bg-primary:   #0A1628;   /* Main background (deep navy) */
  --accent:       #F5A623;   /* Amber accent color */
  --text-primary: #F5F4EF;   /* Body text */
  /* ... */
}
```
Edit these values to retheme the entire site instantly.

---

## 🌐 Deployment

| Platform | Steps |
|---|---|
| **GitHub Pages** | Push to a GitHub repo → Settings → Pages → Deploy from `/` |
| **Netlify** | Drag and drop the project folder at [netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` in the project directory |

---

## ✅ Pre-Launch Checklist

- [ ] Upload `assets/resume.pdf`
- [ ] Add headshot to `assets/headshot.jpg`
- [ ] Update LinkedIn URL (3 places in `index.html`)
- [ ] Update GitHub URL in footer
- [ ] Update `og:url` and `canonical` meta tags
- [ ] Test on mobile (375px) and tablet (768px)
- [ ] Test dark ↔ light mode toggle
- [ ] Verify all download / email links work

---

*Built for Amit Gautam · April 2025*
