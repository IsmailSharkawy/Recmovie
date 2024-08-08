import PropTypes from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TimeSection = ({
  title,
  backgroundClass,
  textColorClass,
  recommendations,
  watchList,
  addToWatchList,
  removeFromWatchList,
}) => {
  const isInWatchList = (movieId) =>
    watchList.some((movie) => movie.id === movieId);

  return (
    <section
      className={`flex flex-col items-center ${backgroundClass} min-h-screen p-8`}
    >
      <div
        className={`text-center ${textColorClass} p-8 bg-opacity-50 bg-black rounded-lg mb-8 w-full`}
      >
        <h1 className="text-4xl mb-4">{title}</h1>
        <div className="w-full">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
          >
            {recommendations.map((movie, index) => (
              <div key={index} className="p-10">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg mb-4 max-h-64 max-w-64"
                  />
                  <h3 className="text-2xl">{movie.title}</h3>
                  <p className="text-lg text-left">{movie.overview}</p>
                  <p className="text-sm">Rating: {movie.vote_average}</p>
                  {!isInWatchList(movie.id) && (
                    <button
                      onClick={() => addToWatchList(movie)}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Add to Watch List
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div
        className={`text-center ${textColorClass} p-8 bg-opacity-50 bg-black rounded-lg w-full`}
      >
        <h2 className="text-3xl mb-4">Your Watch List</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {watchList.map((movie, index) => (
            <div
              key={index}
              className="flex-none w-64 bg-white bg-opacity-20 p-4 rounded-lg"
            >
              <h3 className="text-2xl">{movie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-4 max-h-64 max-w-64 mx-auto"
              />
              <p className="text-sm">Rating: {movie.vote_average}</p>
              <button
                className="mt-2 px-3 py-2 bg-red-500 text-white rounded"
                onClick={() => removeFromWatchList(movie)}
              >
                Remove From Watch List
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

TimeSection.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundClass: PropTypes.string.isRequired,
  textColorClass: PropTypes.string.isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
    })
  ).isRequired,
  watchList: PropTypes.arrayOf(
    PropTypes.shape({
      movieId: PropTypes.string,
      title: PropTypes.string,
      overview: PropTypes.string,
      vote_average: PropTypes.number,
    })
  ),
  addToWatchList: PropTypes.func.isRequired,
  removeFromWatchList: PropTypes.func.isRequired,
};

export default TimeSection;
