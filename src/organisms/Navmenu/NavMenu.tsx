import { ReactElement, ReactNode } from 'react';
import { Button } from '../../atoms';
import { useAppSelector } from '../../hooks';
import './NavMenu.css';

const NavMenu = (): ReactElement => {
  const {
    detail: { firstName, lastName },
  } = useAppSelector((state) => state.user);
  const hour: string = new Date().getHours().toString();
  const mins: string = new Date().getMinutes().toString();
  const sec: string = new Date().getSeconds().toString();
  const day: string = new Date().getDate().toString();
  const month: string = new Date().getMonth().toString();
  const currentTime: ReactNode = (
    <div>
      <p>
        {hour}:{mins}:{sec}
      </p>
      <p>
        {day}, {month}
      </p>
    </div>
  );
  const content: ReactElement = (
    <nav>
      <header>
        <h3>Kommune</h3>
      </header>
      <footer>
        {currentTime}
        <Button type="white" btn="button" text={`${firstName} ${lastName}`} />
      </footer>
    </nav>
  );
  return content;
};

export default NavMenu;
