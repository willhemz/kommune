import { ReactElement } from 'react';
import { createBrowserRouter as browser } from 'react-router-dom';
import { useAppSelector } from './hooks';

const App = () => {
  const { loggedin } = useAppSelector((state) => state.user);
  return browser([
    {
      path: '/',
      element: loggedin ? '' : '',
    },
  ]);
};

export default App;
