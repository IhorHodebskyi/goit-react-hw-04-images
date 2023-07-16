import { useEffect } from 'react';

import { Overlay, Div } from './Modal.styled';

export const Modal = ({
  onClose,
  currentImageDescription,
  currentImageUrl,
}) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, [onClose]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleClickBackdrop}>
      <Div>
        <img
          src={currentImageUrl}
          alt={currentImageDescription}
          loading="lazy"
        />
      </Div>
    </Overlay>
  );
};
