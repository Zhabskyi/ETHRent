import React, { useContext } from "react";
import useForm from "react-hook-form";

import classes from "./Form.module.scss";
import FormCost from "./FormCost";
import ItemContex from "../../context/Item/ItemContext";
import AuthContext from "../../context/auth/authContext";

const Form = props => {
  const itemContex = useContext(ItemContex);
  const authContext = useContext(AuthContext);
  const { addItem } = itemContex;

  const { user } = authContext;

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    const newData = { ...data, user_id: user.id };
    addItem(newData);
    props.history.push("/");
  };
  const intialValues = {
    title: "",
    description: "",
    daily_rate: null,
    deposit: null
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
            placeholder='Description'
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

        <input type='submit' />
      </form>
    </div>
  );
};

export default Form;
