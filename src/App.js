import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import LogIn from './LogIn';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Navbar />  
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/create">
                  <Create />
                </Route>
                <Route exact path="/blogs/:id">
                  <BlogDetails />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </>
        ) : (
          <Switch>
            <Route exact path="/login">
              <LogIn />
            </Route>
            <Redirect to="/login" />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
