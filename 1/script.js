let numberOfFilms;

do {
    numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?');
} while (isNaN(numberOfFilms) || numberOfFilms < 1);

const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};

for (let i = 0; i < 2; i++) {
    let filmName, filmRating;

    do {
        filmName = prompt('Один из последних просмотренных фильмов?');
    } while (filmName == '' || filmName.length > 50);

    do {
        filmRating = prompt('На сколько оцените его?');
    } while (isNaN(filmRating) || filmRating < 0 || filmRating > 10);    

    personalMovieDB.movies[filmName] = filmRating;
}

console.log(personalMovieDB);
