import { ReactElement, ReactNode } from 'react';
import { Button } from '../../atoms';
import { useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = (): ReactElement => {
  const {
    detail: { firstName, lastName },
    loggedin,
  } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const hour: string = new Date().getHours().toString();
  const mins: string = new Date().getMinutes().toString();
  const sec: string = new Date().getSeconds().toString();
  const day: string = new Date().getDate().toString();
  const month: number = new Date().getMonth();
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentTime: ReactNode = (
    <div className="nav__footer--time">
      <p>
        {hour}:{mins}:{sec}
      </p>
      <p>
        {day}, {months[month]}
      </p>
    </div>
  );

  const signin: ReactNode = (
    <div className="nav__footer--signin">
      <span>Already a user?</span>
      <button onClick={() => navigate('/signin')}>sign in</button>
    </div>
  );

  const content: ReactElement = (
    <nav className="nav">
      <header className="nav__header">
        <button onClick={() => navigate('/')}>Kommune</button>
      </header>
      <footer className="nav__footer">
        {!loggedin && signin}
        {currentTime}
        <Button type="white" btn="button">
          {firstName} {lastName}
        </Button>
      </footer>
    </nav>
  );
  return content;
};

export default NavMenu;
