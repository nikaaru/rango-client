import type { WidgetConfig } from '../../types';
import type { EventHandler } from '@nikaru-dev/wallets-react';

export type PropTypes = {
  onUpdateState?: EventHandler;
  config: WidgetConfig;
};
