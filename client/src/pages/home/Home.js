import React, { useContext, useEffect } from "react";
import classes from "./Home.module.scss";
import Items from "../../components/items/Items";
import AuthContext from "../../context/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTools,
  faHandshake,
  faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import CopyRight from "../../components/copyRight/CopyRight";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.info}>
        <h4 className={classes.banner}>Easy Peer-to-Peer Renting</h4>
        <ul className={classes.benefits}>
          <li>Find the gear you need for a short amount of time</li>
          <li>Earn ether for your stuff while it's not in use</li>
        </ul>
        <ol className={classes.directions}>
          <li>Transfer the required deposit to the Ethereum Blockchain</li>
          <li>Use the item for as long as you need</li>
          <li>Once the item is returned, the owner ends the Rental</li>
          <li>
            Fees are transferred to the owner and remaining deposit returned to
            the borrower!
          </li>
        </ol>
        <ul className={classes.icons}>
          <li>
            <FontAwesomeIcon icon={faEthereum} size='5x' />
          </li>
          <li>
            <FontAwesomeIcon icon={faTools} size='5x' />
          </li>
          <li>
            <FontAwesomeIcon icon={faHandshake} size='5x' />
          </li>
          <li>
            <FontAwesomeIcon icon={faCheckDouble} size='5x' />
          </li>
        </ul>
      </div>
      <div className={classes.container}>
        <Items />
      </div>
      <CopyRight>All Rights Reserved</CopyRight>
    </>
  );
};

export default Home;
