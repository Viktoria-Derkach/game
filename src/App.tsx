import React, { FC, Suspense } from 'react';

import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { Location } from 'history';

import { useQuery } from '@/hooks/useQuery';
export const Navigation: FC = () => {
  const query = useQuery();
  const level = query.get('level') || '';

  const getLocationObjWithSearchParams = (
    pathname: string
  ): Partial<Location> => ({
    pathname,
    search: `${
      level &&
      `?${new URLSearchParams({
        level,
      }).toString()}`
    }`,
  });

  return (
    <nav>
      <ul>
        <li>
          <Link to={getLocationObjWithSearchParams('/')}>Home</Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/game-with-hooks')}>
            Game With Hooks
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/game-with-usereducer')}>
            Game With useReducer
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/game-with-reactredux')}>
            Game With ReactRedux
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const Home: FC = () => <h2>Minesweeper game Forever!</h2>;

const MinesweeperWithHooks = React.lazy(() =>
  import('@/pages/MinesweeperWithHooks').then(({ MinesweeperWithHooks }) => ({
    default: MinesweeperWithHooks,
  }))
);

const MinesweeperWithUseReducer = React.lazy(() =>
  import('@/pages/MinesweeperWithUseReducer').then(
    ({ MinesweeperWithUseReducer }) => ({
      default: MinesweeperWithUseReducer,
    })
  )
);

const MinesweeperWithReactRedux = React.lazy(() =>
  import('@/pages/MinesweeperWithReactRedux').then(
    ({ MinesweeperWithReactRedux }) => ({
      default: MinesweeperWithReactRedux,
    })
  )
);

const CellularAutomation = React.lazy(() =>
  import('@/pages/CellularAutomation').then(({ CellularAutomation }) => ({
    default: CellularAutomation,
  }))
);

import { store } from '@/store';
export const App: FC = () => (
  <Provider store={store}>
    <Router>
      <Navigation />
      <Switch>
        <Route path="/game-with-hooks/:username?">
          <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
            <MinesweeperWithHooks />
          </Suspense>
        </Route>
        <Route path="/game-with-usereducer">
          <Suspense
            fallback={<div>Loading minesweeper with useReducer...</div>}
          >
            <MinesweeperWithUseReducer />
          </Suspense>
        </Route>
        <Route path="/game-with-reactredux">
          <Suspense
            fallback={<div>Loading minesweeper with ReactRedux...</div>}
          >
            <MinesweeperWithReactRedux />
          </Suspense>
        </Route>
        <Route path="/cellular-automation">
          <Suspense fallback={<div>Loading Cellular Automation...</div>}>
            <CellularAutomation />
          </Suspense>
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  </Provider>
);
