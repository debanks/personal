// src/routes.js
import React from 'react';
import {Router, Route} from 'react-router';

import App from './app';
import Home from './home';
import ReactGA from 'react-ga';
import Blog from './blog';
import {Article as FortniteArticle} from './blog/Articles/fortnite-pubg';
import {Article as CompetitiveBattleroyale} from './blog/Articles/competitive-battleroyale';
import {Article as WebGenerator} from './blog/Articles/web-generator';

if (process.env.NODE_ENV !== 'development') {
    ReactGA.initialize('UA-60146605-1');
}

function logPageView() {
    if (process.env.NODE_ENV !== 'local') {
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
}

/**
 * The routing information for the app
 */
const Routes = (props) => (
    <Router {...props} onUpdate={logPageView}>
        <Route component={App}>
            <Route path="/" component={Home}/>
            <Route path="/blog" component={Blog}/>
            <Route path="/blog/fortnite-pubg" component={FortniteArticle}/>
            <Route path="/blog/competitive-battleroyale" component={CompetitiveBattleroyale}/>
            <Route path="/blog/web-generator" component={WebGenerator}/>
        </Route>
    </Router>
);

export default Routes;