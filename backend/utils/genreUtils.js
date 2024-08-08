import { DAY_TIMES, MOVIE_GENRES, MOVIE_GENRES_MAP } from "./constants.js";
import { isWeekend } from "./helpers.js";

const getGenreIds = (timeOfDay, hasOccupation) => {
  if (isWeekend()) {
    if (hasOccupation) {
      switch (timeOfDay) {
        case DAY_TIMES.MORNING:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.FAMILY],
            MOVIE_GENRES_MAP[MOVIE_GENRES.COMEDY],
          ];
        case DAY_TIMES.AFTERNOON:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ADVENTURE],
            MOVIE_GENRES_MAP[MOVIE_GENRES.FANTASY],
          ];
        case DAY_TIMES.NIGHT:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.THRILLER],
            MOVIE_GENRES_MAP[MOVIE_GENRES.HORROR],
          ];
        default:
          return [];
      }
    } else {
      switch (timeOfDay) {
        case DAY_TIMES.MORNING:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ANIMATION],
            MOVIE_GENRES_MAP[MOVIE_GENRES.FAMILY],
          ];
        case DAY_TIMES.AFTERNOON:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ADVENTURE],
            MOVIE_GENRES_MAP[MOVIE_GENRES.FANTASY],
          ];
        case DAY_TIMES.NIGHT:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ACTION],
            MOVIE_GENRES_MAP[MOVIE_GENRES.SCIENCE_FICTION],
          ];
        default:
          return [];
      }
    }
  } else {
    if (hasOccupation) {
      switch (timeOfDay) {
        case DAY_TIMES.MORNING:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.DOCUMENTARY],
            MOVIE_GENRES_MAP[MOVIE_GENRES.HISTORY],
          ];
        case DAY_TIMES.AFTERNOON:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.DRAMA],
            MOVIE_GENRES_MAP[MOVIE_GENRES.ROMANCE],
          ];
        case DAY_TIMES.NIGHT:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.THRILLER],
            MOVIE_GENRES_MAP[MOVIE_GENRES.CRIME],
          ];
        default:
          return [];
      }
    } else {
      switch (timeOfDay) {
        case DAY_TIMES.MORNING:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ANIMATION],
            MOVIE_GENRES_MAP[MOVIE_GENRES.COMEDY],
          ];
        case DAY_TIMES.AFTERNOON:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ADVENTURE],
            MOVIE_GENRES_MAP[MOVIE_GENRES.FANTASY],
          ];
        case DAY_TIMES.NIGHT:
          return [
            MOVIE_GENRES_MAP[MOVIE_GENRES.ACTION],
            MOVIE_GENRES_MAP[MOVIE_GENRES.SCIENCE_FICTION],
          ];
        default:
          return [];
      }
    }
  }
};

export default getGenreIds;
