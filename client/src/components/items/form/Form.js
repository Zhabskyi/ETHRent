import React from "react";
import useForm from "react-hook-form";

import classes from "./Form.module.scss";
import FormAddress from "./FormAddress";
import FormCost from "./FormCost";

const Form = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    alert(JSON.stringify(data));
  };
  const intialValues = {
    title: "",
    description: "",
    dayRate: 0,
    deposit: 0,
    address: "",
    city: "",
    province: "",
    postalCode: ""
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            defaultValue={intialValues.title}
            name='title'
            placeholder='Title'
            ref={register({ required: true, minLength: 3 })}
          />
        </div>
        {errors.title && (
          <p className={classes.error}>
            Title should be more then 3 characters
          </p>
        )}

        <div>
          <label htmlFor='description'>Description</label>
          <input
            defaultValue={intialValues.description}
            name='description'
            ref={register({ required: true, minLength: 10 })}
          />
        </div>
        {errors.description && (
          <p className={classes.error}>
            Title should be more then 10 characters
          </p>
        )}

        <FormCost
          errors={errors}
          register={register}
          intialValues={intialValues}
          classes={classes}
        />
        <FormAddress errors={errors} register={register} />

        <input type='submit' />
      </form>
    </div>
  );
};

export default Form;
