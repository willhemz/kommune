import { createBrowserRouter as browser } from 'react-router-dom';
import { DefaultHome } from './organisms';
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
]);

export default App;
