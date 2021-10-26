import { useState } from "react";

const useForm = (initialValues, validate, onSuccess) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });

    if (isSubmitted) {
      const errors = validate(values);
      setErrors(errors);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const errors = validate(values);
    const isValid = Object.keys(errors).length === 0;
    setErrors(errors);
    setIsSubmitted(true);
    if (isValid) {
      onSuccess();
    }
  };

  return {
    values,
    errors,
    isSubmitted,
    setSubmitted: setIsSubmitted,
    handleChange,
    handleSubmit
  };
};

export default useForm;
