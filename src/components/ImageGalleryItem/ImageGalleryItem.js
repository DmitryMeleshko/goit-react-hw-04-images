import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem ({ tags, preview, largeImage, onClick }) {
  return (
    <Item>
      <Img
        src={preview}
        alt={tags}
        onClick={() => {
          onClick(largeImage);
        }}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};