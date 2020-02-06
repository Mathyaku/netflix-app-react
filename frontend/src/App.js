import React from 'react';

import Routes from './routes';

import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom';

import './App.css'

function App() {

  	return (
		<Router>
			<div className="App">
				<nav className="navbar navbar-default navbar-fixed-top" role="navigation">
					<div className="container">
						<div className="navbar-header page-scroll">
						<Link to="/" className="navbar-brand page-scroll">
							<img alt="logo" src="/images/logo.png" height="30" />
						</Link>
						</div>

						<div className="collapse navbar-collapse navbar-ex1-collapse">
						<ul className="nav navbar-nav">
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/new">New</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
						</ul>
						</div>

					</div>
				</nav>

				<Routes></Routes>
		</div>
	</Router>

  );
}

export default App;
