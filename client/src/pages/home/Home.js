import React from "react";
import classes from './Home.module.scss'
import Items from '../../components/items/Items';
import itemContext from "../../context/Item/ItemContext";

const Home = () => {
  return (
    <div className={classes.container}>
        <Items/>
    </div>
  )
};

export default Home;