import { FC, useMemo, useState } from 'react';
import { LoginPage } from './pages/login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Homepage } from './pages/homepage';
import { RegisterPage } from './pages/register';
import './App.css';
import { ImagesDatabase } from './pages/imagesDatabase';

const App: FC<{}> = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(
    false || !!localStorage.getItem('currentUser')
  );

  const renderRoutes = (): JSX.Element => {
    interface RouteI {
      path: string;
      component: JSX.Element;
      requiresAuth: boolean;
    }

    const routes: RouteI[] = [
      {
        path: '/login',
        component: (
          <LoginPage {...{ loginCallback: () => setUserAuthenticated(true) }} />
        ),
        requiresAuth: false,
      },
      {
        path: '/register',
        component: (
          <RegisterPage
            {...{ createAccountCallback: () => setUserAuthenticated(true) }}
          />
        ),
        requiresAuth: false,
      },
      {
        path: '/',
        component: (
          <Homepage
            {...{
              signUserOutCallback: async () => {
                await localStorage.removeItem('currentUser');
                setUserAuthenticated(false);
              },
            }}
          />
        ),
        requiresAuth: true,
      },
      {
        path: '/images',
        component: <ImagesDatabase />,
        requiresAuth: true,
      },
    ];

    const newRoutes = routes.reduce((acc, curr: RouteI) => {
      /* 
        Looping through every routes and if the user is authenticated 
        render only the photo editor page, othwerise render login and register page.
      */

      ((userAuthenticated && curr.requiresAuth) ||
        (!userAuthenticated && !curr.requiresAuth)) &&
        acc.push(curr);

      return acc;
    }, [] as RouteI[]);

    return (
      <Switch>
        {newRoutes.map(({ path, component }, index) => {
          return (
            <Route key={index} exact {...{ path }}>
              {component}
            </Route>
          );
        })}
        <Redirect to={userAuthenticated ? '/' : '/login'}></Redirect>
      </Switch>
    );
  };

  const memoizedRoutes: JSX.Element = useMemo(renderRoutes, [
    userAuthenticated,
  ]);

  return memoizedRoutes;
};

export default App;
