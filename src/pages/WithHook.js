import React from "react";
import useForm from "../hooks/use-form";

const initialValues = {
  email: "",
  password: ""
};

function getErrors(values) {
  const result = {};
  if (!values.email) result.email = "Email is required";
  if (!values.password) result.password = "Password is required";
  return result;
}

export default function WithHook() {
  const { values, errors, handleChange, handleSubmit } = useForm(initialValues, getErrors, () => {
    console.log("Success"); // or redirect
  });

  return (
    <div className="container">
      <h1 className="display-5 text-center mb-3">
        With useForm
      </h1>
      <div className="auth-container">
        <h2 className="text-center mb-4">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="form-control"
            />
            {errors.email && <label>{errors.email}</label>}
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control"
            />
            {errors.password && <label>{errors.password}</label>}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
