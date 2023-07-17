import * as cheerio from "cheerio";
import fetch from "node-fetch";

const urls = [
  "https://www.filmweb.pl/ranking/vod/netflix/film/2023",
  "https://www.filmweb.pl/ranking/vod/hbo_max/film/2023",
  "https://www.filmweb.pl/ranking/vod/canal_plus_manual/film/2023",
  "https://www.filmweb.pl/ranking/vod/disney/film/2023",
];

const maxMoviesPerURL = 10;

async function getMovies() {
  try {
    for (const url of urls) {
      const response = await fetch(url);
      const body = await response.text();
      const $ = cheerio.load(body);

      let moviesCount = 0;

        const movies = [];

      $('.rankingTypeSection__container > .rankingType').map((index, element) => {
        if (moviesCount < maxMoviesPerURL) {
          const moviePosition = $(element).find('.rankingType__position').text();
          const movieTitle = $(element).find('.rankingType__titleWrapper > .rankingType__title').text();
          const movieRating = $(element).find('.rankingType__rateWrapper > .rankingType__rate > .rankingType__rate--value').text();

          moviesCount++;

          console.log(movieRating);
        }

        movies.push({
            moviePosition,
            movieTitle,
            movieRating
        })
      });
    }
    // console.log(movies);

  } catch (error) {
    console.log(error);
  }
}

getMovies();
