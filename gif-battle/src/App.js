/* -------------------------------------------------------------------------- */
/* ALL IMPORTS */
/* -------------------------------------------------------------------------- */
// React
import React from 'react';

// Packages
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

// Context

// Components
import GifDetails from './components/GifDetails';
import Home from './components/Home';

// Assets
// Constants
// Utils / Methods

// Styles
import './App.css';

/* -------------------------------------------------------------------------- */
/* START OF MAIN APP COMPONENT */
/* -------------------------------------------------------------------------- */
const App = function () {
  return (
    <Router>
      <div className="flex bg-green-500 text-white p-5">
        <div className="w-1/12">Mongo Gif-Battle</div>
        <div className="w-11/12 font-bold">
          <Link to="/">Home</Link>
        </div>
      </div>
      <Switch>
        <Route path="/gif/:id">
          <GifDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
