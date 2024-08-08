import { useState } from "react";
import FormRow from "../components/FormRow/FormRow";
import { Form, Link, Navigate, useNavigation } from "react-router-dom";
import { useHomeContext } from "./HomeLayout";

const Register = () => {
  const { user } = useHomeContext();

  const [hasOccupation, setHasOccupation] = useState(true);
  const navigate = useNavigation();
  if (user) {
    return <Navigate to="/" replace />;
  }
  const isSubmitting = navigate.state === "submitting";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <Form method="post" className="form">
          <h2 className="text-2xl mb-8">Register</h2>
          <FormRow type="text" name="firstName" labelText="First Name" />
          <FormRow type="text" name="lastName" labelText="Last name" />
          <FormRow type="email" name="email" labelText="Email" />
          <FormRow type="password" name="password" labelText="Password" />
          <FormRow
            type="checkbox"
            name="hasOccupation"
            labelText="Has Occupation"
            defaultValue={hasOccupation}
            onChange={setHasOccupation}
            className="flex items-center space-x-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
          <p className="mt-4 text-center">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
