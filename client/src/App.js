import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Portfolio from './components/Portfolio';
import Trade from './components/Trade';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const userId = localStorage.getItem('userId');

  return (
    <div className="App">
      <Router>
        <Navbar />
          <Switch>
            <Route path='/' exact component={LoginPage} />
            <Route path='/dashboard' exact component={Portfolio} />
            <ProtectedRoute userId={userId} path='/trade' exact component={Trade} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
