# 🎬 Movie Watchlist Web Application

## 📌 Project Overview

This project is a web-based application that allows users to search for movies and create a personalized watchlist. It integrates a public movie API to fetch real-time data and provides an interactive and user-friendly premium interface.

---

## 🎯 Purpose

The goal of this project is to demonstrate the use of JavaScript concepts such as API integration, higher-order functions (`filter`, `some`, `sort`, `forEach`), responsive CSS grids, and dynamic, seamless UI development.

---

## 🔌 Public API Used

* TMDB API
* https://developer.themoviedb.org/docs/getting-started

---

## ✨ Features

### 🔍 Movie Search
Users can seamlessly search for movies by title through the TMDB API and view results instantly.

### 🎬 Movie Display
Movies are displayed cleanly inside responsive, animated component cards with:
* High-quality Poster
* Title
* Interactive feedback buttons

### ⭐ Watchlist Management
* **Add dynamically:** Add movies to a watchlist with visual confirmation directly on the button UI.
* **Smart duplicates:** Prevents duplicate movie additions inherently using `.some()`.
* **Remove dynamically:** Remove movies smoothly, retaining search states within the list.

### 💾 Data Persistence
* The entire watchlist and the active theme are persistently saved using browser `localStorage`.

### 🔎 Filtering & Sorting (Higher-Order Functions)
* **Search within watchlist:** Uses `Array.prototype.filter()` and `.includes()` for real-time text matching.
* **Sort alphabetically:** Uses `Array.prototype.sort()` and `localeCompare()` to arrange movies securely without traditional loop paradigms.

### 🌙 Dark / Light Mode
* Integrated theme toggling utilizing CSS Custom Classes, providing a premium viewing experience that automatically re-loads when returning.

### 📱 Responsive UI
* CSS Grid allows elegant adaptation to any screen size without relying on external frameworks.

---

## 🛠️ Technologies Used

* Plain HTML5
* Vanilla CSS3 (Custom properties, Grid, Flexbox)
* Vanilla JavaScript (ES6+)
* Fetch API with Promises (`.then` & `.catch`)

---

## 🚀 Future Enhancements

* 🎲 Random Movie Picker
* ⭐ Ratings display
* 📅 Release Date sorting

---

## 📂 Project Setup

1. Clone the repository
2. Open the project folder
3. Run `index.html` in your modern web browser!

---

## 📊 Learning Outcomes

* Robust API integration using `fetch` with error handling (`.catch()`).
* Advanced application of higher-order functions (`forEach`, `filter`, `sort`, `some`).
* Deep usage of the DOM API for generating components dynamically.
* Creating simple yet elegant state-persisting architectures with `localStorage`.

---

## ✅ Conclusion

This project successfully proves how robust modern web applications can be constructed entirely from fundamental native web technologies without relying on frameworks. It combines external APIs, snappy complex user interaction, and dynamic content rendering beautifully.
