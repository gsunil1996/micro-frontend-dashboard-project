import React, { lazy, Suspense, useState } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import Progress from './components/Progress';
import { useSelector, useDispatch } from 'react-redux'
import { saveToken } from './redux/features/tokenSlice';
import PersistLoginComponent from './components/PersistLoginComponent';

const AuthLazy = lazy(() => import('./components/AuthApp'));
const HomeLazy = lazy(() => import('./components/HomeApp'));

const history = createBrowserHistory();

const App = () => {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.tokens);

  useEffect(() => {
    const handleEvent = (event) => {
      if (event.detail.type === 'authType') {
        dispatch(saveToken(event.detail.data))
      }
    };

    document.addEventListener('tokenEvent', handleEvent);

    return () => {
      document.removeEventListener('tokenEvent', handleEvent);
    };
  }, []);

  // console.log("checkToken", token)

  return (
    <>
      <PersistLoginComponent />
      <Router history={history}>
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy />
            </Route>
            {/* private routes */}

            {/* <Route
            path="/"
            render={(props) => (
              <PersistLogin {...props} >
                <HomeLazy />
              </PersistLogin>
            )}
          /> */}

            <Route path="/" component={HomeLazy} />
          </Switch>
        </Suspense>
      </Router>
    </>
  )
}

export default App