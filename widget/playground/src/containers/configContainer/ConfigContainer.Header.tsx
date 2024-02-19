import { Divider, useToast } from '@nikaru-dev/ui';
import React, { useState } from 'react';

import { ExportConfigModal } from '../../components/ExportConfigModal';
import { useConfigStore } from '../../store/config';
import { isConfigChanged } from '../../utils/configs';

import {
  HeaderContainer,
  ResetButton,
  StyledButton,
} from './ConfigContainer.styles';

const TOAST_DURATION = 2_000;

export function Header() {
  const [openExportModal, setOpenExportModal] = useState(false);

  const resetConfig = useConfigStore.use.resetConfig();
  const config = useConfigStore.use.config();
  const { addToast } = useToast();

  const toggleModal = () => setOpenExportModal((prev) => !prev);

  return (
    <HeaderContainer>
      <ResetButton
        type="secondary"
        size="medium"
        variant="ghost"
        onClick={() => {
          resetConfig();
          addToast({
            title: 'Your applied configuration has been reset.',
            autoHideDuration: TOAST_DURATION,
            type: 'success',
            position: 'center-bottom',
            containerStyle: {
              bottom: '24px',
            },
          });
        }}
        disabled={!isConfigChanged(config)}>
        Reset Configuration
      </ResetButton>
      <Divider direction="horizontal" size={16} />
      <StyledButton
        type="secondary"
        size="medium"
        variant="contained"
        onClick={toggleModal}>
        Export Code
      </StyledButton>
      <ExportConfigModal
        open={openExportModal}
        onClose={toggleModal}
        config={config}
      />
    </HeaderContainer>
  );
}
