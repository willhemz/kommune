import { createBrowserRouter as browser } from 'react-router-dom';
import { DefaultHome, GetDevices, Home } from './organisms';
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
  {
    path: '/get-devices',
    element: <GetDevices />,
  },
]);

export default App;
