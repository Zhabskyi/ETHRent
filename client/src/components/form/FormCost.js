import React from "react";

export default function FormAddress({ register, errors, intialValues, classes }) {
  return (
    <>
      <div>
        <label htmlFor='daily_rate'>Day Rate</label>
        <input
          defaultValue={intialValues.daily_rate}
          name='daily_rate'
          placeholder='0'
          ref={register({ required: true })}
        />
      </div>

      <div>
        <label htmlFor='deposit'>Deposit</label>
        <input
          defaultValue={intialValues.deposit}
          name='deposit'
          placeholder='0'
          ref={register({
            required: true,
            validate: {
              positiveNumber: value => parseFloat(value) > 0
            }
          })}
        />
      </div>
      {errors.deposit && errors.deposit.type === "positiveNumber" && (
        <p className={classes.error}>Your deposit is invalid</p>
      )}
    </>
  );
}
