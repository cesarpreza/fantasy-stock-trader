import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Portfolio from './components/Portfolio';
import Trade from './components/Trade';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/dashboard' exact component={Portfolio} />
            <Route path='/trade' exact component={Trade} />
          </Switch>
      </Router>
    </div>
  );
}

//next Steps: Implement dummy data to login a user
  //Use React Router to create a protected route.
  //if the user is authorized (state),
  // return() the Component. 
  // else return the login screen. 

export default App;
