import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export function ImageGallery ({ images, onClick }) {
  return (
    <div>
      <List>
        {images.map(({ id, largeImageURL, tags, webformatURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              largeImage={largeImageURL}
              tags={tags}
              preview={webformatURL}
              onClick={onClick}
            />
          );
        })}
      </List>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func,
};