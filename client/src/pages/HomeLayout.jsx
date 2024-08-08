import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const HomeContext = createContext();
const HomeLayout = ({ onLogout }) => {
  const data = useLoaderData();
  const user = data?.user;
  return (
    <HomeContext.Provider
      value={{
        user,
      }}
    >
      <div>
        <Navbar onLogout={onLogout} />
        <Outlet context={user} />
      </div>
    </HomeContext.Provider>
  );
};

HomeLayout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
// eslint-disable-next-line react-refresh/only-export-components
export const useHomeContext = () => {
  return useContext(HomeContext);
};
export default HomeLayout;
