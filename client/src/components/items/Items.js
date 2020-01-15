import React, { useContext, useEffect, useState } from "react";
import classes from "./Items.module.scss";
import { withRouter } from "react-router-dom";
import ItemContext from "../../context/Item/ItemContext";
import BlockchainContext from "../../context/blockchain/blockchainContext";
import Item from "./item/Item";
import Spinner from "../spinner/Spinner";
import Filter from "../filter/Filter";

const Items = () => {
  const itemContext = useContext(ItemContext);
  const blockchainContext = useContext(BlockchainContext);

  const { items, getItems, loading, itemsByPostal } = itemContext;
  const { products } = blockchainContext;
  const [checkedCategory, setCategory] = useState("all");

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [products, itemsByPostal]);

  const onFilter = e => {
    setCategory(e);
  };

  const postalItems = (
    <>
      {checkedCategory === "all"
        ? itemsByPostal?.map(item => <Item key={item.id} item={item} />)
        : itemsByPostal?.map(item =>
            checkedCategory === item.category ? (
              <Item key={item.id} item={item} />
            ) : null
          )}
    </>
  );

  return (
    <>
      <Filter onFilter={onFilter} checkedCategory={checkedCategory} />
      {items !== null && !loading ? (
        itemsByPostal !== null ? (
          postalItems
        ) : (
          <div className={classes.container}>
            {checkedCategory === "all"
              ? items.reverse().map(item => <Item key={item.id} item={item} />)
              : items.reverse().map(item =>
                  checkedCategory === item.category ? (
                    <Item key={item.id} item={item} />
                  ) : null
                )}
          </div>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default withRouter(Items);
