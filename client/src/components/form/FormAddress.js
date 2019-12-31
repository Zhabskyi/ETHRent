import React from "react";
import classes from "./Form.module.scss";

export default function FormAddress({ register, errors }) {
  return (
    <>
      <div>
        <label htmlFor='address'>Address</label>
        <input
          name='address'
          placeholder='Address'
          ref={register({ required: true })}
        />
      </div>
      {errors.address && <p className={classes.error}>This is required</p>}

      <div>
        <label htmlFor='city'>City</label>
        <input
          name='city'
          placeholder='City'
          ref={register({ required: true })}
        />
      </div>
      {errors.city && <p className={classes.error}>This is required</p>}

      <div>
        <label>Province</label>
        <select name='province' ref={register({ required: true })}>
          <option value='Alberta'>Alberta</option>
          <option value='British Columbia'>British Columbia</option>
          <option value='Manitoba'>Manitoba</option>
          <option value='New Brunswick'>New Brunswick</option>
          <option value='Newfoundland and Labrador'>
            Newfoundland and Labrador
          </option>
          <option value='Nova Scotia'>Nova Scotia</option>
          <option value='Ontario'>Ontario</option>
          <option value='Prince Edward Island'>Prince Edward Island</option>
          <option value='Quebec'>Quebec</option>
          <option value='Saskatchewan'>Saskatchewan</option>
        </select>
      </div>

      <div>
        <label htmlFor='postal_code'>Postal Code</label>
        <input
          name='postal_code'
          placeholder='Postal Code'
          ref={register({ required: true, maxLength: 7, minLength: 6 })}
        />
      </div>
      {errors.postalcode && (
        <p className={classes.error}>Postal code should be 6 characters</p>
      )}
    </>
  );
}
