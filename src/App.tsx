import { createBrowserRouter as browser } from 'react-router-dom';
import { DefaultHome } from './organisms';

const App = browser([
  {
    path: '/',
    element: <DefaultHome />,
  },
]);

export default App;
