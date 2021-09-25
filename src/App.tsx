import { FC, useState } from 'react';
import { LoginPage } from './pages/login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Homepage } from './pages/homepage';

const App: FC<{}> = () => {
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(true);

  const renderRoutes = () => {
    interface RouteI {
      path: string;
      component: JSX.Element;
      requiresAuth: boolean;
    }

    const routes: RouteI[] = [
      {
        path: '/login',
        component: <LoginPage />,
        requiresAuth: false,
      },
      {
        path: '/register',
        component: <div>Register page</div>,
        requiresAuth: false,
      },
      {
        path: '/',
        component: <Homepage />,
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
            <Route key={index} {...{ path }}>
              {component}
            </Route>
          );
        })}
        <Redirect to={userAuthenticated ? '/' : '/login'}></Redirect>
      </Switch>
    );
  };

  return renderRoutes();
};

export default App;
