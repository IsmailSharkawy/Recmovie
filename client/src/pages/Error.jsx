import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
