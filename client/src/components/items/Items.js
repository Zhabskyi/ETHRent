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
        <div classname={classes.radio}>
          <label>
            <input type='radio' value='tools'
              checked={checkedCategory === 'tools'}
              onChange={(e) => {
                setCategory(e.target.value);
              }} />
              Tools
          </label>
          <label>
            <input type='radio' value='sports'
              checked={checkedCategory === 'sports'}
              onChange={(e) => {
                setCategory(e.target.value);
              }} />
              Sports Equipment
          </label>
          <label>
            <input type='radio' value='electronics'
              checked={checkedCategory === 'electronics'}
              onChange={(e) => {
                setCategory(e.target.value);
              }} />
              Electronics
          </label>
          <label>
            <input type='radio' value='all'
              checked={checkedCategory === 'all'}
              onChange={(e) => {
                setCategory(e.target.value);
              }} />
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
