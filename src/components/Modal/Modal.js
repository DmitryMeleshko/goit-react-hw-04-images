import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, OpenModal } from './Modal.styled';

export function Modal ({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  
    return (
      <Overlay onClick={handleOverlayClick}>
        <OpenModal>{children}</OpenModal>
      </Overlay>
    );
    }

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.element.isRequired,
}