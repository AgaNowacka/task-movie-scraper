import * as cheerio from "cheerio";
import fetch from "node-fetch";

async function getMovies() {
    try {

        const netflixResponse = await fetch("https://www.filmweb.pl/ranking/vod/netflix/film/2023");
        

        const body = await netflixResponse.text();
        const $ = cheerio.load(body);

        const movies = [];
        $('.rankingTypeSection__container > .rankingType').map((index, element) => {

            const moviePosition = $(element).find('.rankingType__position').text();
            const movieTitle = $(element).find('.rankingType__titleWrapper > .rankingType__title').text();
            const movieRating = $(element).find('.rankingType__rateWrapper > .rankingType__rate > .rankingType__rate--value').text();

            console.log(movieRating);


        });



    } catch (error) {
        console.log(error);
    }

}

getMovies();