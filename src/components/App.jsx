import { useState, useEffect } from 'react';
// import { ToastContainer } from 'react-toastify';
import { DivApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import * as Images from '../api/Images';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentImageDescription, setCurrentImageDescription] = useState('');

  useEffect(() => {
    if (!searchName) return;
    const getAllImages = async (searchName, page) => {
      try {
        setIsLoading(true);
        const { hits } = await Images.getAllImages(searchName, page);

        setImages(prevState => [...prevState, ...hits]);
        setImagesOnPage(hits.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllImages(searchName, page);
  }, [searchName, page]);

  const onNextFetch = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setImages([]);
    setImagesOnPage(0);
    setIsLoading(false);
    setShowModal(false);
  };
  return (
    <>
      <DivApp>
        <Searchbar onSubmit={handleFormSubmit} />
        {images && <ImageGallery images={images} openModal={openModal} />}
        {isLoading && <Loader />}

        {imagesOnPage === 12 && !isLoading && (
          <Button onNextFetch={onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        {/* <ToastContainer /> */}
      </DivApp>
    </>
  );
};
