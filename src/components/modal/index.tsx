import RModal from 'react-modal';
// import s from './modal.module.scss'
import disableScroll from '@/scripts/disable.scroll';
import { FC, ReactNode, useEffect } from 'react';
import CloseIcon from '../icons/close.icon';

RModal.setAppElement('body');

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ( props ) => {

  useEffect(() => {

    if ( props.isOpen ) {

      disableScroll.on();

    } else {

      disableScroll.off();
    
    }

    return () => {
      
      disableScroll.off();
      
    }

  }, [ props.isOpen ]);

  return (

    <RModal

      isOpen = { props.isOpen }
      onRequestClose = { props.onClose }

      style={{
        overlay: {
          zIndex: '100',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '100',
          background: 'none',
          border: 'none',
          width: 'auto',
        },
      }}

    >

      <div>

        <button onClick = { props.onClose }>

          <CloseIcon />

        </button>

        {props.children}

      </div>

    </RModal>

  )

}

export const ModalTitle: React.FC<{ children: ReactNode }> = ({ children }) => {

  return (

    <div>

      {children}

    </div>

  )

}

export default Modal;

