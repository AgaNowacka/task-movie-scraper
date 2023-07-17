# Task - Movie Scraper

## Descritpion 
Create a simple web scraper that will download titles and ra3ngs of movies from filmweb.pl
(https://www.filmweb.pl/ranking/vod/film). Scraped movies should be from actual year and
you should include only top 4 VOD services (Netflix, Max, Canal +, Disney). From each VOD
movies list, you should scrape only 10 top movies. Then you should deduplicate (if needed)
by movie title (higher rating should be saved). Results should be saved in CSV file format
with such columns: Title, VOD service name, ra3ng. Results should be ordered by rating in
descending order.
While implementing solution please have in mind an efficiency and time to delivery. You can
use whatever NPM packages you want.
Please attach in response an original email URL to repository with solution (instead of
attaching full source code).
Deliverables:
- Publicly available repository with code and commit history.
- Source code
- Unit tests will be a plus.
- Try to embrace asynchronous approach and use parallelism whenever it’s possible!

## Running program:

node app.js
