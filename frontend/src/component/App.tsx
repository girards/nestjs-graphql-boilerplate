import React from 'react';
import { Switch } from 'react-router-dom';
import { getRoutes } from '../routes';



const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <Switch>
        {getRoutes()}
      </Switch>
    </React.Fragment>
  )
}

export default App;
