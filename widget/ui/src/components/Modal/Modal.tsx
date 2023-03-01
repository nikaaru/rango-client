import { CSSProperties } from '@stitches/react';
import React from 'react';
import { createPortal } from 'react-dom';
import { styled } from '../../theme';
import { CloseIcon } from '../Icon/CloseIcon';
import { Typography } from '../Typography';

export interface PropTypes {
  title: string;
  open: boolean;
  onClose: () => void;
  content: React.ReactNode;
  action?: React.ReactNode;
  containerStyle?: CSSProperties;
  contentStyle?: CSSProperties;
}

const BackDrop = styled('div', {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,.1)',
});

const ModalContainer = styled('div', {
  backgroundColor: '$background',
  borderRadius: '$10',
  padding: '$16 $16',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '$s',
  zIndex: 10,
});
const Row = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
const ModalHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  marginBottom: '$16',
});

const ContentContainer = styled('div', {
});

export function Modal(props: PropTypes) {
  const {
    title,
    content,
    open,
    onClose,
    containerStyle,
    action,
    contentStyle,
  } = props;

  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };
  return (
    <>
      {open &&
        createPortal(
          <BackDrop onClick={handleBackDropClick}>
            <ModalContainer style={containerStyle}>
              <ModalHeader>
                <Typography variant="h4">{title}</Typography>
                <Row>
                  {action}
                  <CloseIcon size={24} onClick={onClose} />
                </Row>
              </ModalHeader>
              <ContentContainer style={contentStyle}>
                {content}
              </ContentContainer>
            </ModalContainer>
          </BackDrop>,
          document.body
        )}
    </>
  );
}
