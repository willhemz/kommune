import { createBrowserRouter as browser } from 'react-router-dom';
import { DefaultHome, Home } from './organisms';
import { SignForm, SignUpForm } from './molecules';

const App = browser([
  {
    path: '/',
    element: <DefaultHome />,
    children: [
      {
        path: '/',
        element: <SignUpForm />,
      },
      {
        path: '/signin',
        element: <SignForm />,
      },
    ],
  },
  {
    path: '/kommune',
    element: <Home />,
  },
]);

export default App;
