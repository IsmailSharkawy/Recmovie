import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useHomeContext } from "../../pages/HomeLayout";
import logo from "../../assets/logo.png";

const SERVER_URL =
  import.meta.env.VITE_BASE_SERVER_URL || "http://localhost:5100/";
const Navbar = ({ onLogout }) => {
  const { user } = useHomeContext();
  const authenticated = user ? true : false;
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-lg font-bold">
            <img src={logo} alt="Logo" className="w-11 h-11 mx-auto" />
            Home
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {authenticated && (
            <>
              {user && user.user.avatar && (
                <img
                  src={`${SERVER_URL}${user.user.avatar}`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <p className="text-white">Hi, {user.user.firstName}</p>
              <Link
                to="/profile"
                className="text-white bg-green-500 px-4 py-2 rounded"
              >
                Profile
              </Link>
            </>
          )}
          {authenticated ? (
            <button
              onClick={onLogout}
              className="text-white bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
