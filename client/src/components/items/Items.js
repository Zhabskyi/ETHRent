import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Items.module.scss";
import ItemContext from "../../context/Item/ItemContext";
import BlockchainContext from "../../context/blockchain/blockchainContext";
import Item from "./item/Item";
import Spinner from "../spinner/Spinner";
import Filter from "../filter/Filter";

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

  const onFilter = (e) => {
    setCategory(e)
  }

  return (
    <>
      <Filter onFilter={onFilter} checkedCategory={checkedCategory}/>
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
