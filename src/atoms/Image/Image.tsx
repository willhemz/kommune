import { ReactElement } from 'react';
import { ImageType } from '../../models';

const Image = ({ url, className }: ImageType): ReactElement => {
  return (
    <div className={className}>
      <img className={`container--img`} src={url} alt="" />
    </div>
  );
};

export default Image;
