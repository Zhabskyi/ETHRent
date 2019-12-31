import React, { useState, useContext, useEffect } from "react";
import useForm from "react-hook-form";

import AuthContext from "../../context/auth/authContext";

import classes from "./Form.module.scss";
import FormAddress from "./FormAddress";

const Form = () => {
  const authContext = useContext(AuthContext);
  const { registerUser, isAuthenticated } = authContext;

  const { register, handleSubmit, errors, watch } = useForm();
  const onSubmit = data => {
    registerUser(data);
    alert(JSON.stringify(data));
  };
  const intialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    city: "",
    province: "",
    postalCode: ""
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div>
          <label htmlFor='first_name'>First Name</label>
          <input
            defaultValue={intialValues.firstName}
            name='first_name'
            placeholder='First Name'
            ref={register({ required: true, minLength: 2 })}
          />
        </div>
        {errors.firstName && (
          <p className={classes.error}>
            First name should be more then 2 characters
          </p>
        )}

        <div>
          <label htmlFor='last_name'>Last Name</label>
          <input
            defaultValue={intialValues.lastName}
            name='last_name'
            placeholder='Last Name'
            ref={register({ required: true, minLength: 2 })}
          />
        </div>
        {errors.lastName && (
          <p className={classes.error}>
            Last name should be more then 2 characters
          </p>
        )}

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

        <div>
          <label htmlFor='password2'>Confirm password</label>
          <input
            name='password2'
            placeholder='Confirm password'
            ref={register({
              validate: value => value === watch("password")
            })}
          />
        </div>
        {errors.password2 && (
          <p className={classes.error}>Passwords does not match</p>
        )}

        <FormAddress errors={errors} register={register} />

        <input type='submit' />
      </form>
    </div>
  );
};

export default Form;
