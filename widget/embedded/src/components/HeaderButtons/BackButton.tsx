import type { PropTypes } from './HeaderButtons.types';

import { ChevronLeftIcon } from '@nikaru-dev/ui';
import React from 'react';

import { HeaderButton } from './HeaderButtons.styles';

function BackButton(props: PropTypes) {
  return (
    <HeaderButton variant="ghost" size="small" onClick={props.onClick}>
      <ChevronLeftIcon color="black" size={16} />
    </HeaderButton>
  );
}

export { BackButton };
