import React from 'react';
import './App.css';
import Investor from './components/Investors/show'
import Home from './components/'
import { Switch, Route , BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } ></Route>
        <Route  exact path="/investors/:id" component={ Investor } ></Route>
      </Switch>
    </Router>
  );
}

export default App;
