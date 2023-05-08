import { useState, useEffect } from 'react';
import { apiServis, PER_PAGE } from '../../api/Api';
import { ToastContainer, toast } from 'react-toastify';

import { Box } from './App.styled';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Error } from 'components/Error/Error';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [perPageImg, setPerPageImg] = useState(null);
  
  useEffect(() => {
    if (!query) {
      return;
    }

    const imagesArray = data => {
      return data.map(({ id, largeImageURL, tags, webformatURL }) => {
        return { id, largeImageURL, tags, webformatURL };
      });
    };

    const searchImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await apiServis(page, query);
        if (totalHits === 0) {
          toast.error(`No results were found for ${query}`);
          setIsLoading(false);
          setPerPageImg(null);
          return;
        }

        const images = imagesArray(hits);

        setImages(prevState => {
          return [...prevState, ...images];
        });
        setPerPageImg(hits.length);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    searchImages();
  }, [page, query]);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onOpenModal = largeImage => {
    setLargeImage(largeImage);
    toggleModal();
  };

  const handleSubmit = newQuery => {
    if (query !== newQuery) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    } else {
      toast(
        `We've already searched for images matching "${query}".
        Please enter another request.`
      );
    }
  };

  const loadMoreImg = () => {
    setPage(page + 1);
  };

  return (
    <Box>
      <Searchbar onSubmit={handleSubmit} />

      {error && <Error texterror={error} />}

      {images.length > 0 && !error && (
        <>
          <ImageGallery images={images} onClick={onOpenModal} />
          {perPageImg && perPageImg < PER_PAGE && <p>No more pictures</p>}
        </>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="Big images" />
        </Modal>
      )}
      {perPageImg === PER_PAGE && !isLoading && (
        <Button onClick={loadMoreImg} />
      )}
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
    </Box>
  );
}