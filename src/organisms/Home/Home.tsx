import { ReactElement, ReactNode, useRef } from 'react';
import NavMenu from '../Navmenu/NavMenu';
import './Home.css';
import { Image, ImgBg } from '../../atoms';
import { BiVideoPlus } from 'react-icons/bi';
import { MdOutlineKeyboardAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Home = (): ReactElement => {
  const url: string = new URL('../../assets/connected.png', import.meta.url)
    .href;
  const inputRef = useRef<HTMLInputElement>(null!);
  const navigate = useNavigate();

  const icon: ReactNode = (
    <button
      onClick={() => navigate('/get-devices')}
      className="formContainer__btn"
    >
      <BiVideoPlus />
      <span>New Meeting</span>
    </button>
  );

  const form: ReactNode = (
    <form noValidate className="formContainer__form">
      <div>
        <MdOutlineKeyboardAlt />
      </div>
      <input ref={inputRef} type="text" placeholder="Enter a code or link" />
    </form>
  );

  const schedule: ReactNode = (
    <section className="home__main--schedule">
      <div className="home__main--schedule__desc">
        <h3>Premium video meetings.</h3>
        <h3>Free for everyone.</h3>
        <p>
          We re-engineered the service that we built for secure business
          meetings, Kommune, to make it free and available for all.
        </p>
      </div>
      <div className="home__main--schedule__formContainer">
        {icon}
        {form}
      </div>
    </section>
  );

  const desc: ReactNode = (
    <section className="home__main--container">
      <Image className="home__main--container__image" url={url} />
      <h3 className="home__main--container__desc">Get a link you can share</h3>
      <p className="home__main--container__text">
        Click <span>New Meeting</span> to get a link that you can send to people
        that you want to commune with.
      </p>
    </section>
  );

  const content: ReactElement = (
    <div className="home">
      <ImgBg />
      <NavMenu />
      <main className="home__main">
        {schedule}
        {desc}
      </main>
    </div>
  );
  return content;
};

export default Home;
