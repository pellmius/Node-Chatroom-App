import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home/Home'
import Room from './components/Room/Room'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path ='/room/:roomname' component = {Room}></Route>
      </Switch>
    </Router>
  );
}

export default App;
