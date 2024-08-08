import { useState } from "react";
import TimeSection from "../components/TimeSection/TimeSection";
import { useLoaderData } from "react-router-dom";
import { useHomeContext } from "./HomeLayout";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { checkIfWeekend } from "../utils/helpers";

const MovieRecommendations = () => {
  let { movies } = useLoaderData();
  let { user } = useHomeContext();
  let userWatchLists = user?.user.watchlists;
  let recommendations = {
    morning: movies[0],
    afternoon: movies[1],
    night: movies[2],
  };
  let isWeekend = checkIfWeekend();

  let todaysWatchList = [];
  if (isWeekend) {
    todaysWatchList = userWatchLists.weekends;
  } else {
    todaysWatchList = userWatchLists.weekdays;
  }
  const addToWatchList = async (timeOfDay, movie) => {
    try {
      await customFetch.patch("/users/watchlists", {
        dayTime: timeOfDay,
        movie,
      });

      setWatchLists((prevWatchLists) => ({
        ...prevWatchLists,
        [timeOfDay]: [...prevWatchLists[timeOfDay], movie],
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error adding movie to watchlist");
    }
  };

  const removeFromWatchList = async (timeOfDay, movieToRemove) => {
    try {
      await customFetch.patch("/users/watchlists/remove", {
        dayTime: timeOfDay,
        id: movieToRemove.id,
      });

      setWatchLists((prevWatchLists) => ({
        ...prevWatchLists,
        [timeOfDay]: prevWatchLists[timeOfDay].filter(
          (movie) => movie.id !== movieToRemove.id
        ),
      }));
    } catch (error) {
      console.error(error);
      toast.error("Error removing movie from watchlist");
    }
  };
  const [watchLists, setWatchLists] = useState(todaysWatchList);
  return (
    <div>
      <TimeSection
        title="Morning Recommendations"
        backgroundClass="bg-yellow-200"
        textColorClass="text-gray-800"
        recommendations={recommendations.morning}
        watchList={watchLists.morning}
        addToWatchList={(movie) => addToWatchList("morning", movie)}
        removeFromWatchList={(movie) => removeFromWatchList("morning", movie)}
      />
      <TimeSection
        title="Afternoon Recommendations"
        backgroundClass="bg-blue-300"
        textColorClass="text-gray-800"
        recommendations={recommendations.afternoon}
        watchList={watchLists.afternoon}
        addToWatchList={(movie) => addToWatchList("afternoon", movie)}
        removeFromWatchList={(movie) => removeFromWatchList("afternoon", movie)}
      />
      <TimeSection
        title="Night Recommendations"
        backgroundClass="bg-indigo-900"
        textColorClass="text-white"
        recommendations={recommendations.night}
        watchList={watchLists.night}
        addToWatchList={(movie) => addToWatchList("night", movie)}
        removeFromWatchList={(movie) => removeFromWatchList("night", movie)}
      />
    </div>
  );
};

export default MovieRecommendations;
