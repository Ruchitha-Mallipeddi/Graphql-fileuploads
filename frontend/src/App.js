import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FileStorage from "./pages/FileStorage";
import {
  ApolloClient, 
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'


const apolloCache = new InMemoryCache()

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql', // Apollo Server is served from port 4000
  headers: {
    "keep-alive": "true"
  }
})
const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink
})
const App = () => {
  return (
    <div>
      <ApolloProvider client={client}>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/" exact>
            <FileStorage />
          </Route>
          <Route path="/file-storage" exact>
            <FileStorage />
          </Route>
        </Switch>
      </Router>
      </ApolloProvider>
    </div>
  );
};

export default App;
