import React from "react";
import classes from "./Form.module.scss";

const FormConst = ({ props, register, errors, intialValues, classes }) => {
  return (
    <>
      <div>
        <label htmlFor='daily_rate'>Day Rate (ETH)</label>
        <input
          defaultValue={props.daily_rate || intialValues.daily_rate}
          name='daily_rate'
          placeholder='0'
          ref={register({ required: true })}
        />
      </div>

      <div>
        <label htmlFor='deposit' className={classes.container_deposit}>Deposit (ETH)</label>
        <p>* Please ensure this is an adequate replacement cost of the item</p>
        <input
          defaultValue={props.deposit || intialValues.deposit}
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

export default FormConst;
