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
    if (searchName === '') return;
    const getAllImages = async (searchName, page) => {
      try {
        setIsLoading(true);
        const { hits } = await Images.getAllImages(searchName, page);

        setImages(() => [...images, ...hits]);
        setImagesOnPage(hits.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllImages(searchName, page);
  }, [searchName, page, images]);

  //=============================================================================
  // const getAllImages = async (searchName, page) => {
  //   try {
  //     setIsLoading(true);
  //     const { hits } = await Images.getAllImages(searchName, page);

  //     setImages(() => [...images, ...hits]);
  //     setImagesOnPage(hits.length);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  //=============================================================================
  const onNextFetch = () => {
    setPage(page + 1);
  };
  //===============================================================================
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  //========================================================================

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(!showModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };
  //============================================================================
  const handleFormSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setImages([]);
    setImagesOnPage(0);
    // setTotalImages(0);
    setIsLoading(false);
    setShowModal(false);
    // setError(null);
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

// export class App extends Component {
//   state = {
//     searchName: '',
//     page: 1,
//     images: [],
//     imagesOnPage: 0,
//     totalImages: 0,
//     isLoading: false,
//     showModal: false,
//     error: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchName, page } = this.state;
//     if (prevState.searchName !== searchName || prevState.page !== page) {
//       this.getAllImages(searchName, page);
//     }
//   }

//   getAllImages = async (searchName, page) => {
//     try {
//       this.setState({ isLoading: true });
//       const { hits } = await Images.getAllImages(searchName, page);

//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         imagesOnPage: hits.length,
//       }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   onNextFetch = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   openModal = e => {
//     const currentImageUrl = e.target.dataset.large;
//     const currentImageDescription = e.target.alt;

//     if (e.target.nodeName === 'IMG') {
//       this.setState(({ showModal }) => ({
//         showModal: !showModal,
//         currentImageUrl: currentImageUrl,
//         currentImageDescription: currentImageDescription,
//       }));
//     }
//   };

//   handleFormSubmit = searchName => {
//     this.setState({
//       searchName,
//       page: 1,
//       images: [],
//       imagesOnPage: 0,
//       totalImages: 0,
//       isLoading: false,
//       showModal: false,
//       error: null,
//     });
//   };

//   render() {
//     const {
//       images,
//       imagesOnPage,

//       isLoading,
//       showModal,
//       currentImageUrl,
//       currentImageDescription,
//     } = this.state;
//     const handleFormSubmit = this.handleFormSubmit;
//     const onNextFetch = this.onNextFetch;
//     const openModal = this.openModal;
//     const toggleModal = this.toggleModal;

//     return (
//       <>
//         <DivApp>
//           <Searchbar onSubmit={handleFormSubmit} />
//           {images && <ImageGallery images={images} openModal={openModal} />}
//           {isLoading && <Loader />}

//           {imagesOnPage === 12 && !isLoading && (
//             <Button onNextFetch={onNextFetch} />
//           )}

//           {showModal && (
//             <Modal
//               onClose={toggleModal}
//               currentImageUrl={currentImageUrl}
//               currentImageDescription={currentImageDescription}
//             />
//           )}
//           {/* <ToastContainer /> */}
//         </DivApp>
//       </>
//     );
//   }
// }
