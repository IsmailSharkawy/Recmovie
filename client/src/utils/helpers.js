import customFetch from "./customFetch";

export const fetchCurrentUser = async () => {
  try {
    const response = await customFetch.get("/users/current-user");
    return response.data;
  } catch (error) {
    console.error("Failed to load user data:", error);
    return null;
  }
};

export const checkIfWeekend = () => {
  let isWeekend = false;
  const today = new Date().getDay();
  if (today === 5 || today === 6) {
    isWeekend = true;
  }
  return isWeekend;
};
