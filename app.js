import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const urls = [
  { url: "https://www.filmweb.pl/ranking/vod/netflix/film/2023", service: "Netflix" },
  { url: "https://www.filmweb.pl/ranking/vod/hbo_max/film/2023", service: "HboMax" },
  { url: "https://www.filmweb.pl/ranking/vod/canal_plus_manual/film/2023", service: "CanalPlus" },
  { url: "https://www.filmweb.pl/ranking/vod/disney/film/2023", service: "Disney" },
];

const maxMoviesPerURL = 10;

async function getMovies() {
  try {
    const allMovies = [];

    for (const { url, service } of urls) {
      const response = await fetch(url);
      const body = await response.text();
      const $ = cheerio.load(body);

      let moviesCount = 0;

      $('.rankingTypeSection__container > .rankingType').map((index, element) => {
        if (moviesCount < maxMoviesPerURL) {
          const movieTitle = $(element).find('.rankingType__titleWrapper > .rankingType__title').text();
          const movieRating = parseFloat($(element).find('.rankingType__rateWrapper > .rankingType__rate > .rankingType__rate--value').text().replace(',', '.'));

          allMovies.push({
            service,
            movieTitle,
            movieRating,
          });

          moviesCount++;
        }
      });
    }

    allMovies.sort((a, b) => b.movieRating - a.movieRating);

    return allMovies;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function deduplicate(movies) {
  const uniqueMovies = {};
  movies.forEach((movie) => {
    const { movieTitle, movieRating } = movie;
    if (!uniqueMovies[movieTitle] || uniqueMovies[movieTitle].movieRating < movieRating) {
      uniqueMovies[movieTitle] = movie;
    }
  });

  return Object.values(uniqueMovies);
}

async function saveToCSV(movies) {
  try {
    let csvContent = "Index Title ServiceName Rating\n"; 

    movies.forEach((movie, index) => {
      const { movieTitle, service, movieRating } = movie;
      const csvRow = `${index + 1}. ${movieTitle}, ${service}, ${movieRating}\n`;
      csvContent += csvRow;
    });

    fs.writeFileSync("movies.csv", csvContent);

    console.log("Dane zostały zapisane do pliku movies.csv.");
  } catch (error) {
    console.log("Wystąpił błąd:", error);
  }
}

async function main() {
  try {
    const movies = await getMovies();
    const deduplicatedMovies = await deduplicate(movies);
    await saveToCSV(deduplicatedMovies);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
  }
}

main();
