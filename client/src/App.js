import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/dashboard' exact component={Portfolio} />
          </Switch>
      </Router>
    </div>
  );
}

//next Steps: Switch gears to a single user using the app that can trade. 
// No login for now
// create dummy trade data to pass from font end to back end 
// create portfolio page
  // account balance, stocks holding, value of holding, total assets. 

export default App;
