import React from "react";

export default function FormAddress({ register, errors, intialValues, classes }) {
  return (
    <>
      <div>
        <label htmlFor='dayRate'>Day Rate</label>
        <input
          defaultValue={intialValues.dayRate}
          name='dayRate'
          placeholder='Day Rate'
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
