import { allProviders } from '@rango-dev/provider-all';
import { ErrorIcon, Spinner, Typography } from '@rango-dev/ui';
import { Provider } from '@rango-dev/wallets-core';
import { RangoClient } from 'rango-sdk';
import React, { useEffect, useState } from 'react';

import List from './components/List';
import { WC_PROJECT_ID } from './constants';

const providers = allProviders({
  walletconnect2: {
    WC_PROJECT_ID: WC_PROJECT_ID,
  },
});

export function App() {
  const client = new RangoClient(process.env.REACT_APP_API_KEY as string);
  // Because allBlockChains didn't use the BlockchainMeta type from rango-sdk, we have to use any type
  const [blockchains, setBlockChains] = useState<any>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAllBlockchains = async () => {
      try {
        const res = await client.getAllMetadata();
        setBlockChains(res.blockchains);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };
    void getAllBlockchains();
  }, []);

  return (
    <Provider providers={providers} allBlockChains={blockchains} autoConnect>
      {!process.env.REACT_APP_API_KEY && (
        <p className="ml-12 warning">
          <ErrorIcon color="warning" size={24} /> Please add REACT_APP_API_KEY
          into .env
        </p>
      )}
      <div className="flex">
        <h1 className="ml-12">Providers</h1>
        {loading && (
          <div className="flex">
            <Spinner size={20} />{' '}
            <Typography variant="body" size="xsmall">
              Loading...
            </Typography>
          </div>
        )}
      </div>
      {!!error && (
        <p className="ml-12 error">
          Failed Get Blockchains From Server: {error}
        </p>
      )}
      <List />
    </Provider>
  );
}
