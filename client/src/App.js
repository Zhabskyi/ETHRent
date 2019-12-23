import React, { Fragment } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Navbar from './components/navbar/Navbar'


const App = () => {
	return (

			<Router>
				<Fragment>
					<Navbar />
					<div className='container'>
						<Switch>

						</Switch>
					</div>
				</Fragment>
			</Router>

	);
};

export default App;
