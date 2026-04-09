let currentMovies = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// ---------------- Debounce ----------------
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// ---------------- Add to Watchlist ----------------
function addToWatchlist(index, btn) {
    const movie = currentMovies[index];
    const alreadyExists = watchlist.some(item => item.id === movie.id);

    const originalText = btn.innerText;

    if (alreadyExists) {
        btn.innerText = "Already Added";
        setTimeout(() => {
            btn.innerText = originalText;
        }, 2000);
        return;
    }

    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    displayWatchlist();

    btn.innerText = "Added ✔";
    setTimeout(() => {
        btn.innerText = originalText;
    }, 2000);
}

// ---------------- API Key ----------------
const apiKey = "YOUR_API_KEY";

// ---------------- Search Function ----------------
function searchMovies(query) {
    if (!query) return;

    document.getElementById("loading").style.display = "block";

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(res => res.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                currentMovies = data.results;
                displayMovies(currentMovies);
            } else {
                document.getElementById("movies").innerHTML = "<p>No movies found</p>";
            }

            document.getElementById("loading").style.display = "none";
        })
        .catch(() => {
            document.getElementById("movies").innerHTML = "<p style='color:#e50914;'>Something went wrong</p>";
            document.getElementById("loading").style.display = "none";
        });
}

// ---------------- Debounced Search ----------------
const debouncedSearch = debounce(searchMovies, 500);

// ---------------- Events ----------------
const searchBtn = document.getElementById("searchBtn");

// Button click (still works)
searchBtn.addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;
    searchMovies(query);
});

// Typing search (debounced)
document.getElementById("searchInput").addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
});

// ---------------- Display Movies ----------------
function displayMovies(movies) {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    movies.forEach((movie, index) => {
        const div = document.createElement("div");
        div.className = "movie-card";

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        div.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <p>${movie.title}</p>
            <button onclick='addToWatchlist(${index}, this)'>+ Watchlist</button>
        `;

        container.appendChild(div);
    });
}

// ---------------- Watchlist ----------------
function displayWatchlist() {
    const container = document.getElementById("watchlist");
    container.innerHTML = "";

    watchlist.forEach((movie, index) => {
        const div = document.createElement("div");
        div.className = "movie-card";

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        div.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <p>${movie.title}</p>
            <button class="remove-btn" onclick="removeFromWatchlist(${index})">❌ Remove</button>
        `;

        container.appendChild(div);
    });
}

displayWatchlist();

// ---------------- Remove ----------------
function removeFromWatchlist(index) {
    watchlist.splice(index, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateWatchlistView();
}

// ---------------- Filter + Sort ----------------
document.getElementById("watchlistSearch").addEventListener("input", updateWatchlistView);
document.getElementById("sortOptions").addEventListener("change", updateWatchlistView);

function updateWatchlistView() {
    const searchValue = document.getElementById("watchlistSearch").value.toLowerCase();
    const sortValue = document.getElementById("sortOptions").value;

    let resultList = [...watchlist];

    if (searchValue !== "") {
        resultList = resultList.filter(movie =>
            movie.title.toLowerCase().includes(searchValue)
        );
    }

    if (sortValue === "A → Z") {
        resultList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "Z → A") {
        resultList.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayFilteredWatchlist(resultList);
}

function displayFilteredWatchlist(movies) {
    const container = document.getElementById("watchlist");
    container.innerHTML = "";

    movies.forEach((movie) => {
        const div = document.createElement("div");
        div.className = "movie-card";

        const originalIndex = watchlist.indexOf(movie);

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        div.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <p>${movie.title}</p>
            <button class="remove-btn" onclick="removeFromWatchlist(${originalIndex})">❌ Remove</button>
        `;

        container.appendChild(div);
    });
}

// ---------------- Theme ----------------
const themeToggleBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});