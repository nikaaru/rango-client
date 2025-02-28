import type {
  ProviderInterface,
  ProviderProps,
} from '@nikaru-dev/wallets-react';

import { Provider } from '@nikaru-dev/wallets-react';
import React from 'react';

import Adapter from './adapter';

function AdapterProvider({ children, ...props }: ProviderProps) {
  const list = props.providers.map(
    (provider: ProviderInterface) => provider.config.type
  );

  return (
    <Provider {...props}>
      <Adapter list={list}>{children}</Adapter>
    </Provider>
  );
}

export default AdapterProvider;
