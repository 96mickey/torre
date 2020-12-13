import { Route, Switch } from 'react-router-dom';
import './App.css';
import {NotFound, Home, Person} from './containers';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/person/:id" children={<Person />} />
          <Route component={NotFound} />
        </Switch>
    </div>
  );
}

export default App;
