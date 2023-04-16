import { ReactElement } from 'react';
import { ImageType } from '../../models';
import './Image.css';

const Image = ({ url, size }: ImageType): ReactElement => {
  return (
    <div className={`container__${size}`}>
      <img className="img" src={url} alt="" />
    </div>
  );
};

export default Image;
