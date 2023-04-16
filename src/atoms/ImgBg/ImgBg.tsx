import { ReactElement } from 'react';
import { BgGeneral } from '../../models';
import './ImgBg.css';

const ImgBg = (): ReactElement => {
  const image: BgGeneral = new URL('../../assets/elvis_bg.jpg', import.meta.url)
    .href;
  return <img className="background" src={image} alt="" />;
};

export default ImgBg;
