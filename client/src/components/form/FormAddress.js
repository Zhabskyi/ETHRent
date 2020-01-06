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
          <option value='AB'>Alberta</option>
          <option value='BC'>British Columbia</option>
          <option value='MB'>Manitoba</option>
          <option value='NB'>New Brunswick</option>
          <option value='NL'>
            Newfoundland and Labrador
          </option>
          <option value='NS'>Nova Scotia</option>
          <option value='ON'>Ontario</option>
          <option value='PE'>Prince Edward Island</option>
          <option value='QC'>Quebec</option>
          <option value='SK'>Saskatchewan</option>
        </select>
      </div>

      <div>
        <label htmlFor='postal_code'>Postal Code</label>
        <input
          name='postal_code'
          placeholder='Postal Code'
          ref={register({ required: true, maxLength: 6, minLength: 6 })}
        />
      </div>
      {errors.postalcode && (
        <p className={classes.error}>Postal code should be 6 characters</p>
      )}

      <div>
        <label htmlFor='phone_number'>Phone number</label>
        <input
          name='phone_number'
          placeholder='Phone number'
          ref={register({ required: true })}
        />
      </div>
      {errors.postalcode && (
        <p className={classes.error}>Phone number required!</p>
      )}
    </>
  );
}
