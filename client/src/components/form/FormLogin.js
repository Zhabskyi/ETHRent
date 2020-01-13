import React, { useContext, useEffect } from "react";
import useForm from "react-hook-form";

import AuthContext from "../../context/auth/authContext";

import classes from "./Form.module.scss";

const Form = props => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    login(data);
  };

  const intialValues = {
    email: "",
    password: ""
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            placeholder='email@mail.com'
            type='text'
            ref={register({
              required: "This is required",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email address"
              }
            })}
          />
        </div>
        {errors.email && <p>{errors.email.message}</p>}

        <div>
          <label htmlFor='password'>Password</label>
          <input
            defaultValue={intialValues.password}
            name='password'
            placeholder='password'
            ref={register({ required: true, minLength: 5 })}
          />
        </div>
        {errors.password && (
          <p className={classes.error}>
            Password should be more then 5 characters
          </p>
        )}
        <input type='submit' />
      </form>
    </div>
  );
};

export default Form;
