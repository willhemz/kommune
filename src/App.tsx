import { createBrowserRouter as browser } from 'react-router-dom';
import { CallPage, DefaultHome, GetDevices, Home } from './organisms';
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
    path: '/kommune/get-devices',
    element: <GetDevices />,
  },
  {
    path: '/kommune/:roomId',
    element: <CallPage />,
  },
]);

export default App;
