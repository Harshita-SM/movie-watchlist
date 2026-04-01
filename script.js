let currentMovies = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
function addToWatchlist(index) {
    watchlist.push(currentMovies[index]);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Added to watchlist!");
    // displayWatchlist();
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

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : " ";          //  "https://via.placeholder.com/200x300?text=No+Image"

        div.innerHTML = `
            <img src="${poster}" width="150">
            <p>${movie.title}</p>
            <button onclick='addToWatchlist(${index})'>Add</button>
        `;

        container.appendChild(div);
    });
}

function displayWatchlist() {
    const container = document.getElementById("watchlist");
    container.innerHTML = "";

    watchlist.forEach(movie => {
        const div = document.createElement("div");

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image";

        div.innerHTML = `
            <img src="${poster}" width="100">
            <p>${movie.title}</p>
        `;

        container.appendChild(div);
    });
}

displayWatchlist();

