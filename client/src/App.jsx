import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import HomeLayout, { useHomeContext } from "./pages/HomeLayout";
import PropTypes from "prop-types";
import "tailwindcss/tailwind.css";
import MovieRecommendations from "./pages/MovieRecommendations";
import Error from "./pages/Error";
import customFetch from "./utils/customFetch";
import { toast } from "react-toastify";
import { fetchCurrentUser } from "./utils/helpers";
const App = () => {
  const handleLogout = async () => {
    await customFetch.get("/auth/logout");

    window.location.reload();
  };
  const ProtectedRoute = ({ element }) => {
    const { user } = useHomeContext();
    return user ? element : <Navigate to="/login" />;
  };

  ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout onLogout={handleLogout} />,
      loader: async () => {
        try {
          const response = await customFetch.get("/users/current-user");
          return { user: response.data };
        } catch (error) {
          console.error("Failed to load user data:", error);
          return {};
        }
      },

      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <ProtectedRoute element={<MovieRecommendations />} />,
          loader: async () => {
            const user = await fetchCurrentUser();
            try {
              const movieResponseMorning = await customFetch.get("/movies", {
                params: {
                  dayTime: "morning",
                  hasOccupation: user?.user?.hasOccupation,
                },
              });
              const movieResponseAfternoon = await customFetch.get("/movies", {
                params: {
                  dayTime: "afternoon",
                  hasOccupation: user?.user?.hasOccupation,
                },
              });
              const movieResponseNight = await customFetch.get("/movies", {
                params: {
                  dayTime: "night",
                  hasOccupation: user?.user?.hasOccupation,
                },
              });

              const watchListResponse = await customFetch.get("/watchlist");
              let watchListsByDayTime = [
                movieResponseMorning.data.results,
                movieResponseAfternoon.data.results,
                movieResponseNight.data.results,
              ];
              return {
                movies: watchListsByDayTime,
                watchLists: watchListResponse.data,
              };
            } catch (error) {
              console.error("Failed to load movie recommendations:", error);
              return {};
            }
          },
        },
        {
          path: "register",
          element: <Register />,
          action: async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
              await customFetch.post("/auth/register", data);
              toast.success("Registration successful!");
              return redirect("/login");
            } catch (err) {
              console.error(err);
              toast.error(err?.response?.data?.msg || "An error occurred.");
            }
            return null;
          },
        },
        {
          path: "login",
          element: <Login />,
          action: async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
              await customFetch.post("/auth/login", data);
              toast.success("Login successful!");
              return redirect("/");
            } catch (err) {
              console.error(err);
              toast.error(err?.response?.data?.msg || "An error occurred.");
            }
            return null;
          },
        },
        {
          path: "profile",
          element: <ProtectedRoute element={<Profile />} />,
          action: async ({ request }) => {
            const formData = await request.formData();
            if (!formData.has("hasOccupation")) {
              formData.append("hasOccupation", false);
            }

            try {
              await customFetch.patch("/users/update-user", formData);
              toast.success("Profile updated successfully!");
            } catch (err) {
              console.error(err);
              toast.error(err?.response?.data?.msg || "An error occurred.");
            }
            return null;
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
