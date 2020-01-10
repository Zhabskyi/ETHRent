import React from 'react';
import classes from './MenuToggle.module.scss';

const MenuToggle = (props) => {
	return (
	<div className={classes.menuToggle} onClick={props.onClick}>
		<div></div>
		<div></div>
		<div></div>
	</div>)
};

export default MenuToggle;