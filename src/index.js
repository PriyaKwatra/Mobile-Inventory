import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Description from './components/description/Description';
import Cart from './components/cart/Cart';
import './index.css';
import Inventory from './components/inventory/Inventory';
import Navigation from './components/navigation/Navigation';
import Login from './components/login/Login';
import rootReducer from './reducers/index';
import * as serviceWorker from './serviceWorker';
import { withRouter } from "react-router-dom";



const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
  <Router >
    <Navigation />
    <Switch>
      <Route exact component={Inventory} path="/" />
      <Route exact path="/description/:productName" component={Description} />
      <Route exact path="/cart" component={Cart} />
      <Route exact component={Login} path="/login" />
    </Switch>
  </Router>
</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();