import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import TestPage from './routes/TestPage';
import TengPage from './routes/TengPage';
import TestForm from './routes/TestForm';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/test" exact component={TestPage} />
        <Route path="/teng" exact component={TengPage} />
        <Route path="/form" exact component={TestForm} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
