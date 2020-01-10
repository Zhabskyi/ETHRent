import React, {useState, useContext, useEffect} from "react";
import classes from "./Filter.module.scss";
import ItemContext from "../../context/Item/ItemContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Filter = (props) => {
  const itemContext = useContext(ItemContext);

  const {  getUserByPostal } = itemContext;

  const [postalInput, setPostalInput] = useState('');

  useEffect(() => {
    if(postalInput) {
      getUserByPostal(postalInput);
    }
    // eslint-disable-next-line
  }, [postalInput])

  const handleChange = async (event) => {
    setPostalInput(event.target.value.toUpperCase());
  }
  

  return (
    <div className={classes.filter}>
      <form>
        <div className={classes.radios}>
          <input type='radio' value='tools' id='radio-1'
            checked={props.checkedCategory === 'tools'}
            onChange={e => {
              props.onFilter(e.target.value)
            }} />
          <label htmlFor='radio-1'>
            Tools
          </label>
          <input type='radio' value='sports' id='radio-2'
            checked={props.checkedCategory === 'sports'}
            onChange={(e) => {
              props.onFilter(e.target.value);
            }} />
          <label htmlFor='radio-2'>
            Sports Equipment
          </label>
          <input type='radio' value='electronics' id='radio-3'
            checked={props.checkedCategory === 'electronics'}
            onChange={(e) => {
              props.onFilter(e.target.value);
            }} />
          <label htmlFor='radio-3'>
            Electronics
          </label>
          <input type='radio' value='all' id='radio-4'
            checked={props.checkedCategory === 'all'}
            onChange={(e) => {
              props.onFilter(e.target.value);
            }} />
          <label htmlFor='radio-4'>
            All
          </label>
        </div>
      </form>
      <form className={classes.postal}>
        <div>
          <label className={classes.postalLabel} htmlFor='postal_code'>Postal Code</label>
          <input
            className={classes.postalBox}
            name='postal_code'
            placeholder='Postal Code'
            onChange={handleChange}
          />
        </div>
        <div className={classes.postalSearch}>
          <FontAwesomeIcon icon={faSearch} size='2x' />
        </div>
      </form>
      {/* <p>Current State: {postalInput}</p> */}
    </div>
  );
};

export default Filter;