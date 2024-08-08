import { Form, Link, Navigate, useNavigation } from "react-router-dom";
import FormRow from "../components/FormRow/FormRow";
import { useHomeContext } from "./HomeLayout";

const Login = () => {
  const { user } = useHomeContext();

  const navigate = useNavigation();
  if (user) {
    return <Navigate to="/" replace />;
  }
  const isSubmitting = navigate.state === "submitting";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <Form method="post" className="form">
          {" "}
          <div className="mb-4">
            <FormRow type="email" name="email" labelText="Email" />
            <FormRow type="password" name="password" labelText="Password" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register Now
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
