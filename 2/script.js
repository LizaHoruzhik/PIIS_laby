const personalMovieDB = {
    privat: Math.round(Math.random()),
    movies: {
        "Фильм 1": 8.5,
        "Фильм 2": 7.3,
        "Фильм 3": 9.0
    }
};

function showMovies() {
    const tableContainer = document.getElementById('movie-table');
    let tableMovies = '<table><tr><th>Название фильма</th><th>Оценка</th></tr>';

    for (let i in personalMovieDB.movies) {
        tableMovies += `<tr><td>${i}</td><td>${personalMovieDB.movies[i]}</td></tr>`;
    }

    tableMovies += '</table>';
    tableContainer.innerHTML = tableMovies;
}

if (personalMovieDB.privat) {
    alert('Доступ к базе фильмов закрыт.');
} else {
    alert('Доступ к базе фильмов открыт.');
    showMovies();
}