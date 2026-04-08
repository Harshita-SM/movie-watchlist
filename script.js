let currentMovies = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
function addToWatchlist(index) {
    const movie = currentMovies[index];
    const alreadyExists = watchlist.some(item => item.id === movie.id);
    if (alreadyExists) {
        alert("Already in watchlist!");
        return;
    }

    // watchlist.push(currentMovies[index]);
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    // alert("Added to watchlist!");
    displayWatchlist();
}
function showWatchlist() {
    console.log(watchlist);
}

const apiKey = "96df6a80aefc90bf1999777b1612345e"; 

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const query = document.getElementById("searchInput").value;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(res => res.json())
        .then(data => {
            // if (data.results) {
            //     displayMovies(data.results);
                currentMovies = data.results;
                displayMovies(currentMovies);
        });
//             } else {
//                 document.getElementById("movies").innerHTML = "<p>No movies found</p>";
//             }
//         });
});

function displayMovies(movies) {
    const container = document.getElementById("movies");
    container.innerHTML = "";

    movies.forEach((movie,index) => {
        const div = document.createElement("div");
        div.className = "movie-card";

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        div.innerHTML = `
            <img src="${poster}" alt="${movie.title}">
            <p>${movie.title}</p>
            <button onclick='addToWatchlist(${index})'>Add</button>
        `;

        container.appendChild(div);
    });
}

function displayWatchlist() {
    const container = document.getElementById("watchlist");
    container.innerHTML = "";

    watchlist.forEach((movie,index) => {
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


function removeFromWatchlist(index) {
    watchlist.splice(index, 1);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    
    const searchValue = document.getElementById("watchlistSearch").value.toLowerCase();
    if (searchValue) {
        const filtered = watchlist.filter(movie => 
            movie.title.toLowerCase().includes(searchValue)
        );
        displayFilteredWatchlist(filtered);
    } else {
        displayWatchlist();
    }
}

document.getElementById("watchlistSearch").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
        displayWatchlist();
        return;
    }

    const filtered = watchlist.filter(movie =>
        movie.title.toLowerCase().includes(value)
    );

    displayFilteredWatchlist(filtered);
});

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