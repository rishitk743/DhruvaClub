# Dhruva Club — PQ IQ SQ Personality Assessment Webpage

A responsive, high-performance static assessment web application designed for **Dhruva Club** student assessments and character development initiatives. Built with pure HTML5, Vanilla CSS, and JavaScript, ready for direct deployment on **GitHub Pages** with a **Firebase Firestore** cloud database backend.

---

## 🌟 Key Features

- **Direct Assessment Experience**: Clean, single-page multi-step flow without unnecessary landing page friction.
- **Brand Integrated Luxury UI**: Glassmorphic dark theme (`#0B0F19`), gold & amber accents (`#F59E0B`), responsive layout, and Google Fonts (`Space Grotesk` + `Inter`).
- **Collapsible About Us**: Interactive accordion introducing the club's mission and the 4 quotients (PQ, IQ, EQ, SQ).
- **Single-File Content Customization (`js/content.js`)**: Update questions, options, WhatsApp links, or About Us copy in one place without touching HTML or CSS.
- **Smart Gender-Based Community Redirect**: Automatically forwards participants to their respective Male/Female WhatsApp community group on `result.html`.
- **Firebase Firestore Backend**: Securely records student registration details, year, branch, division, and all test answers with offline preview fallback.
- **GitHub Pages Ready**: Zero build steps, zero node modules required for deployment.

---

## 📁 Repository Structure

```
.
├── index.html              # Main assessment page with multi-step test
├── result.html             # Submission confirmation & WhatsApp redirect
├── README.md               # Documentation & setup guide
├── assets/
│   ├── logo.png            # Dhruva Club logo
│   └── Dhruva Club logo.png
├── css/
│   └── styles.css          # Design system, glassmorphism, responsive styles
└── js/
    ├── content.js          # ⭐ All questions, text & WhatsApp links (EDIT HERE)
    ├── firebase-config.js  # ⭐ Firebase credentials & Firestore connector
    └── app.js              # Multi-step state, validation & submission logic
```

---

## 🚀 Quick Start (Running Locally)

Because this is a pure static site, you can run it with any local web server:

### Option 1: VS Code / IDE Live Server
Right-click `index.html` and click **"Open with Live Server"**.

### Option 2: Python HTTP Server
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Node `npx serve`
```bash
npx serve .
```

---

## ⚙️ Configuration Guide

### 1. Connecting Firebase Firestore (Database)

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g. `dhruva-club-assessment`).
2. Under **Project Settings** > **General** > **Your apps**, click the **Web `</>`** icon to register a web app.
3. Open [`js/firebase-config.js`](file:///d:/Dhurva%20Club%20PQ%20IQ%20SQ%20Test%20Webpage/js/firebase-config.js) and replace the placeholders:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "dhruva-assessment.firebaseapp.com",
     projectId: "dhruva-assessment",
     storageBucket: "dhruva-assessment.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
4. In Firebase Console, go to **Firestore Database** > **Create database** (start in Test mode, or configure write permissions for the collection `dhruva_test_submissions`).

*Note: If Firebase is unavailable or rejects a write, the app reports the failure and keeps the user on the registration step instead of claiming that the data was saved.*

The first successful registration also creates `dhruva_test_stats/summary`. It stores registration and gender totals, `pendingStatusCount` (registrations without a confirmed community choice), `totalJoined`, `totalJoinLater`, and `notJoinedList` (names and phone numbers of participants who selected “I will join later”). Previous summary entries without a confirmed community choice are preserved in `unverifiedStatusList`; the old joined total is retained as `historicalReportedJoinedCount` instead of being presented as confirmed. Stats and the submission are saved together, and community totals change only when the assessment is submitted. The legacy summary is migrated on the next registration or assessment submission.

---

### 2. Updating WhatsApp Links & Questions

Open [`js/content.js`](file:///d:/Dhurva%20Club%20PQ%20IQ%20SQ%20Test%20Webpage/js/content.js):

#### WhatsApp Community Links:
```javascript
whatsappLinks: {
  male: "https://chat.whatsapp.com/YOUR_MALE_GROUP_INVITE_CODE",
  female: "https://chat.whatsapp.com/YOUR_FEMALE_GROUP_INVITE_CODE",
  default: "https://chat.whatsapp.com/YOUR_DEFAULT_GROUP_INVITE_CODE"
}
```

#### Adding / Editing Questions:
Simply add or modify objects in the `steps` array in `content.js`:
```javascript
{
  id: "mbti_q1",
  question: "When you have to make an important decision, you mostly prioritize…",
  options: [
    "Rules, objectivity, and what is fair for everyone",
    "Logical reasoning, hard facts, and calculated outcomes",
    "Empathy, people's personal feelings, and values",
    "Keeping peace, balance, and group harmony"
  ]
}
```

---

## 🌐 Deploying to GitHub Pages

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Initialize Dhruva Club assessment webpage"
   git push origin main
   ```
2. On GitHub, navigate to your repository **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/ (root)` folder.
4. Click **Save**. Within 1–2 minutes, your website will be live at:
   `https://<your-username>.github.io/<repo-name>/`
