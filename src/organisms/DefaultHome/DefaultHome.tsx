import { ReactElement } from 'react';
import NavMenu from '../Navmenu/NavMenu';
import './DefaultHome.css';
import { Image, ImgBg } from '../../atoms';
import { SignForm } from '../../molecules';

const DefaultHome = (): ReactElement => {
  const url: string = new URL('../../assets/connected.png', import.meta.url)
    .href;

  const content: ReactElement = (
    <div className="home">
      <ImgBg />
      <NavMenu />

      <main className="home__main">
        <section className="home__main--container">
          <Image className="home__main--container__image" url={url} />
          <p className="home__main--container__text">
            Let's <span>Kommune</span>
          </p>
        </section>
        <SignForm />
      </main>
    </div>
  );
  return content;
};

export default DefaultHome;
