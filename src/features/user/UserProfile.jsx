import React from 'react';
import { useGetUserQuery, useUpdateUserMutation } from './userApi.js';
import { Formik } from 'formik';
import { Button, Input } from '@material-tailwind/react';
import toast from 'react-hot-toast';

export default function UserProfile({ user }) {
  const { data, isLoading, error } = useGetUserQuery(user?.token);
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="font-poppins">
      <main className="max-w-xl mx-auto p-5">
        <h1 className="text-2xl font-bold py-5">Profile Update</h1>
        <Formik
          enableReinitialize
          initialValues={{
            username: data.username,
            email: data.email,
          }}
          onSubmit={async (val) => {
            try {
              await updateUser({
                token: user.token,
                body: {
                  username: val.username,
                  email: val.email,
                },
              });
              toast.success('User updated successfully');
            } catch (err) {
              toast.error(err.data?.message || err.data);
            }
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Input
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <Button loading={updateLoading} type="submit">
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
}
