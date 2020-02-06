import React from 'react';

import Home from './pages/Home';
import Series from './pages/Series';
import NewSeries from './pages/NewSeries';
import EditSeries from './pages/EditSeries';

import {
	Route,
	Switch,
} from 'react-router-dom';

import './App.css';

const About = () => <section className="intro-section"> <h1> About page </h1> </section>;

function Routes() {

    return(
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/new" component={NewSeries}></Route>
            <Route path="/series/edit/:id" component={EditSeries}></Route>
            <Route path="/series/:genre" component={Series}></Route>
            <Route path="/about" component={About}></Route>
        </Switch>
    );
}

export default Routes;