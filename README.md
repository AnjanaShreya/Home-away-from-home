# Home Away From Home — Serviced Apartments

A web application for **Home Away From Home** serviced apartments in Hyderabad, built with React, TypeScript, and SCSS Modules.

---

## ⚡ Quick Start (How to Run)

### 1. Install dependencies
```bash
npm install
```

### 2. Start local server
```bash
npm start
```
Open **`http://localhost:3000`** in your browser.

---

## 💡 Why is Node.js Required?

Browsers only understand plain HTML, CSS, and vanilla JavaScript. They cannot run **React (JSX)**, **TypeScript (`.tsx`)**, or **SCSS (`.scss`)** directly.

Node.js is used during development to:
1. **Package Management (`npm`):** Download and manage libraries like React, React Router, and RSuite UI.
2. **Compilation & Bundling:** Automatically translate TypeScript (`.tsx`) and SCSS into standard JS and CSS that browsers can read.
3. **Local Dev Server:** Power `npm start` so the browser updates instantly when you edit files.

*(Note: Once you run `npm run build`, the output is plain HTML/JS/CSS that can be hosted on any web server without needing Node.js on the production server).*

---

## 🧰 Tech Stack

- **React 19** + **TypeScript**
- **React Router v6** (Multi-page routing)
- **SCSS Modules** (Scoped component styling) + SCSS Variables
- **RSuite v6** (UI DatePickers, Modals, Drawers)

---

## 📊 Where is the Data?

All content, room tariffs, features, stay categories, and contact info live in one file:
👉 **`src/data/booksitedata.json`**

Edit `booksitedata.json` to update room names, prices, images, or contact details across the app.

---

## 📁 Folder Structure

```
my-app/
├── src/
│   ├── components/       # Modular UI components (Navbar, Hero, BookCards, etc.)
│   ├── data/             # 📊 booksitedata.json (Room rates & content)
│   ├── styles/           # 🎨 SCSS variables & design tokens
│   ├── types/            # 🏷️ TypeScript interface & type definitions
│   ├── App.tsx           # Page routes & layout setup
│   └── index.tsx         # App entry point
└── package.json          # Project dependencies & scripts
```
