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

export default App;
