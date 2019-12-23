import React, { Fragment } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import './App.scss';

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home';
import About from './pages/about/About';


const App = () => {
	return (

			<Router>
				<Fragment>
					<Navbar title={'ETHRent'} />
					<div className='container'>
						<Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
						</Switch>
					</div>
				</Fragment>
			</Router>

	);
};

export default App;
