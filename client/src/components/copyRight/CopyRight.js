import React from 'react';

import classes from './copyRight.module.scss';

const copyRight = (props) => {
	return (
		<div className={classes.container}>
				&#9400; {new Date().getFullYear()} {props.children}
		</div>
	)
}

export default copyRight;
