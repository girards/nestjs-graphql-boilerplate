import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: !window.location.hostname.includes("localhost") ? `http://api.${window.location.hostname}/graphql` : 'http://localhost:3000/graphql',
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
