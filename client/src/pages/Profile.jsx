import { Form } from "react-router-dom";
import FormRow from "../components/FormRow/FormRow";
import { useState } from "react";
import { useHomeContext } from "./HomeLayout";

const Profile = () => {
  const { user } = useHomeContext();
  const [hasOccupation, setHasOccupation] = useState(user?.user?.hasOccupation);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <Form method="post" className="space-y-6" encType="multipart/form-data">
          <h2 className="text-2xl mb-8">Profile</h2>
          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Select an image file
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            defaultValue={user?.user?.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            defaultValue={user?.user?.lastName}
          />
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
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
