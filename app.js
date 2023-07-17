import * as cheerio from "cheerio";
import fetch from "node-fetch";


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


    return allMovies;
  } catch (error) {
    console.log(error);
    return []; 
  }
}


async function main() {
  try {
   
    
  } catch (error) {
    console.log("Wystąpił błąd:", error);
  }
}

main();
