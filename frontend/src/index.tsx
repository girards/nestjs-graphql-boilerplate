import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { ApolloProvider } from '@apollo/react-hooks'
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloLink } from 'apollo-boost';
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({ uri: !window.location.hostname.includes("localhost") ? `http://api.${window.location.hostname}/graphql` : 'http://localhost:3000/graphql', headers: { batch: "true " } });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log("Link", token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link = ApolloLink.from([errorLink, httpLink, authLink])

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true
  }),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  }
});

ReactDOM.render(
  <Suspense fallback="">
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Suspense>,
  document.getElementById('root')
);
