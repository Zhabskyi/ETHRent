import React from "react";
import classes from './Home.module.scss'
import Items from '../../components/items/Items';
import itemContext from "../../context/Item/ItemContext";
import Form from '../../components/items/form/Form';

const Home = () => {
  
  return (
    <div className={classes.container}>
        <Items/>
        <Form />
    </div>
  )
};

export default Home;