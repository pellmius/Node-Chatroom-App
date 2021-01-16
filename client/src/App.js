import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home/Home'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><Home /></Route>
      </Switch>
    </Router>
  );
}

export default App;