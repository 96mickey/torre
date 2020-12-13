import { Route, Switch } from 'react-router-dom';
import './App.css';
import {NotFound, Home} from './containers';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route component={NotFound} />
        </Switch>
    </div>
  );
}

export default App;
