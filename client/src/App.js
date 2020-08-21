import React from 'react';
import './App.css'
import BookList from './components/BookList'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBook from './components/AddBook';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1> <LocalLibraryIcon/> Book Store</h1>
        <BookList/>
        <AddBook/>
       
      </div>
    </ApolloProvider>
  );
}

export default App;
