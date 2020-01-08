import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Items.module.scss";
import ItemContext from "../../context/Item/ItemContext";
import BlockchainContext from "../../context/blockchain/blockchainContext";
import Item from "./item/Item";
import Spinner from "../spinner/Spinner";

const Items = () => {
  const itemContext = useContext(ItemContext);
  const blockchainContext = useContext(BlockchainContext);

  const { items, getItems, loading } = itemContext;
  const { products } = blockchainContext;
  const [checkedCategory, setCategory] = useState('all');

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [products]);

  return (
    <>
      <form>
        <div className={classes.radios}>
          <input type='radio' value='tools' id='radio-1'
            checked={checkedCategory === 'tools'}
            onChange={(e) => {
              setCategory(e.target.value);
            }} />
          <label for='radio-1'>
            Tools
          </label>
          <input type='radio' value='sports' id='radio-2'
            checked={checkedCategory === 'sports'}
            onChange={(e) => {
              setCategory(e.target.value);
            }} />
          <label for='radio-2'>
            Sports Equipment
          </label>
          <input type='radio' value='electronics' id='radio-3'
            checked={checkedCategory === 'electronics'}
            onChange={(e) => {
              setCategory(e.target.value);
            }} />
          <label for='radio-3'>
            Electronics
          </label>
          <input type='radio' value='all' id='radio-4'
            checked={checkedCategory === 'all'}
            onChange={(e) => {
              setCategory(e.target.value);
            }} />
          <label for='radio-4'>
            All
          </label>
        </div>
      </form>
      {items !== null && !loading ? (
        <>
          {checkedCategory === 'all' ? items.map(item => (
            <Item key={item.id} item={item} />
          )) :
          items.map(item => (
            checkedCategory === item.category ?
            <Item key={item.id} item={item} /> :
            null
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withRouter(Items);
