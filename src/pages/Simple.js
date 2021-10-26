import React, { useState } from "react";

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

export default function Simple() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setSubmitted] = useState(false);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });

    if (isSubmitted) {
      const errors = getErrors(values);
      setErrors(errors);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errors = getErrors(values);
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      // send
    }
    setErrors(errors);
    setSubmitted(true);
  };
  return (
    <div className="container">
      <h1 className="display-5 text-center mb-3">Sample</h1>
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
