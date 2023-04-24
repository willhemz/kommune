import { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from '../Navmenu/NavMenu';
import './DefaultHome.css';
import { Image, ImgBg } from '../../atoms';

const DefaultHome = (): ReactElement => {
  const url: string = new URL('../../assets/connected.png', import.meta.url)
    .href;

  const content: ReactElement = (
    <div className="defHome">
      <ImgBg />
      <NavMenu />
      <main className="defHome__main">
        <section className="defHome__main--container">
          <Image className="defHome__main--container__image" url={url} />
          <p className="defHome__main--container__text">
            Let's <span>Kommune</span>
          </p>
        </section>
        <Outlet />
      </main>
    </div>
  );
  return content;
};

export default DefaultHome;
