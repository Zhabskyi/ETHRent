import React from "react";
import classes from "./Filter.module.scss";

const Filter = (props) => {

  return (
    <div className={classes.filter}>
      <form>
        <div className={classes.radios}>
          <input type='radio' value='tools' id='radio-1'
            checked={props.checkedCategory === 'tools'}
            onChange={e => {
              props.onFilter(e.target.value)
            }} />
          <label for='radio-1'>
            Tools
          </label>
          <input type='radio' value='sports' id='radio-2'
            checked={props.checkedCategory === 'sports'}
            onChange={(e) => {
              props.onFilter(e.target.value);
            }} />
          <label for='radio-2'>
            Sports Equipment
          </label>
          <input type='radio' value='electronics' id='radio-3'
            checked={props.checkedCategory === 'electronics'}
            onChange={(e) => {
              props.onFilter(e.target.value);
            }} />
          <label for='radio-3'>
            Electronics
          </label>
          <input type='radio' value='all' id='radio-4'
            checked={props.checkedCategory === 'all'}
            onChange={(e) => {
              props.onFilter(e.target.value);
            }} />
          <label for='radio-4'>
            All
          </label>
        </div>
      </form>
      <form>
        <div>
          <label htmlFor='postal_code'>Postal Code</label>
          <input
            className={classes.postalFilter}
            name='postal_code'
            placeholder='Postal Code'
          />
        </div>
      </form>
      
    </div>
  );
};

export default Filter;