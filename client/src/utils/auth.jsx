import customFetch from "./customFetch";

export const isAuthenticated = async () => {
  try {
    const res = await customFetch.get("/users/current-user");
    return res.data ? true : false;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};
