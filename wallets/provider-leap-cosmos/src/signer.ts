import type { SignerFactory } from 'rango-types';

import { DefaultCosmosSigner } from '@nikaru-dev/signer-cosmos';
import { getNetworkInstance, Networks } from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default function getSigners(provider: any): SignerFactory {
  const cosmosProvider = getNetworkInstance(provider, Networks.COSMOS);
  const signers = new DefaultSignerFactory();
  signers.registerSigner(
    TxType.COSMOS,
    new DefaultCosmosSigner(cosmosProvider)
  );
  return signers;
}
