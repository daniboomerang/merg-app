import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import NotesPage from './screens/notes/NotesPage';
import HomePage from './screens/home/HomePage';
import './App.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  cache,
  link
});

const App = () =>
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/notes">
          <NotesPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>;

export default App;
