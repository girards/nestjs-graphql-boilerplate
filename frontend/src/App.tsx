import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BRANCH } from './queries';
import { branch } from './types/branch';


const App: React.FunctionComponent = () => {

  const { loading, error, data } = useQuery<branch>(BRANCH);
  return (
    <div className="App">
      {data && data.branch}
    </div>
  );
}

export default App;
