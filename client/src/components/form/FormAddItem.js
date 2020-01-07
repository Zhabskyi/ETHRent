import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import useForm from "react-hook-form";
import Web3 from 'web3';

import classes from "./Form.module.scss";
import FormCost from "./FormCost";
import ItemContex from "../../context/Item/ItemContext";
import AuthContext from "../../context/auth/authContext";
import BlockchainContext from "../../context/blockchain/blockchainContext";

const FormAddItem = props => {
  const itemContex = useContext(ItemContex);
  const authContext = useContext(AuthContext);
  const blockchainContext = useContext(BlockchainContext);

  //Local state
  const [file, setFile] = useState(null);

  const { addItem, editItem } = itemContex;
  const { user } = authContext;
  const { createProduct, editProduct } = blockchainContext;

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const depositWei = Web3.utils.toWei(data.deposit, 'Ether');
    const rateWei = Web3.utils.toWei(data.daily_rate, 'Ether');
    let newData = new FormData();
    Object.keys(data).forEach(key => newData.append(key, data[key]));
    newData.append("user_id", user.id);
    newData.append("file", file);
    
    if (!props.id) {
      createProduct(data.title, data.description, depositWei, rateWei);
      addItem(newData);
    } else {
      editItem(props.id, newData);
      props.toggleFormDetails();
      const changedID = props.id - 1;
      editProduct(props.id, data.title, data.description, depositWei, rateWei);
    }
    redirectToHome();
  };

  const redirectToHome = () => {
    const { history } = props;
    if (history) history.push("/");
  };

  const handleSelectedFile = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const intialValues = {
    title: "",
    description: "",
    daily_rate: null,
    deposit: null,
    file: null
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form} encType="multipart/form-data">
        <div>
          <label htmlFor='title'>Title</label>
          <input
            defaultValue={props.title || intialValues.title}
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
            defaultValue={props.description || intialValues.description}
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

        <div>
          <label htmlFor='file'>Upload file</label>
          <input
            type='file'
            accept='image/png, image/jpeg'
            defaultValue={intialValues.file}
            name='files'
            onChange={handleSelectedFile}
            placeholder=''
            ref={register({ required: true })}
          />
        </div>
        {errors.files && (
          <p className={classes.error}>Upload picture requered</p>
        )}

        <FormCost
          props={props}
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

export default withRouter(FormAddItem);
