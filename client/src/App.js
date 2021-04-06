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
            <Route path='/trade' exact component={Portfolio} />
          </Switch>
      </Router>
    </div>
  );
}

//next Steps: Figure out how many pages my app will be. 2-3?
//make buttons in navbar clickable to navigte to each page
//workout logic got user login page 
//Modal for user login? 

export default App;
