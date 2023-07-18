import { useEffect } from 'react';

import { Overlay, Div } from './Modal.styled';

export const Modal = ({
  onClose,
  currentImageDescription,
  currentImageUrl,
}) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

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
