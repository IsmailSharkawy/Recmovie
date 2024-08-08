import axios from "axios";
import getGenreIds from "../utils/genreUtils.js";

let cache = {};

const resetCacheAtMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const timeUntilMidnight = midnight.getTime() - now.getTime();

  setTimeout(() => {
    cache = {};
    console.log("Cache has been reset");
    setInterval(() => {
      cache = {};
      console.log("Cache has been reset");
    }, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
};

resetCacheAtMidnight();

export const getMovieRecommendations = async (req, res) => {
  const { dayTime, hasOccupation } = req.query;
  let genres = getGenreIds(dayTime, hasOccupation);
  genres = genres.join(",");
  const cacheKey = `${dayTime}_${hasOccupation}_${genres}`;
  if (cache[cacheKey]) {
    console.log("Returning cached data");
    return res.json(cache[cacheKey]);
  }
  try {
    const response = await axios.get(process.env.MOVIE_RECOM_BASE_URL, {
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
        with_genres: genres,
      },
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });
    cache[cacheKey] = response.data;

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching movie recommendations" });
  }
};
