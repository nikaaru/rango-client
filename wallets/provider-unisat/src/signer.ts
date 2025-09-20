import type { Provider } from './utils.js';
import type { SignerFactory } from 'rango-types';

import { LegacyNetworks as Networks } from '@nikaru-dev/wallets-core/legacy';
import {
  dynamicImportWithRefinedError,
  getNetworkInstance,
} from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default async function getSigners(
  provider: Provider
): Promise<SignerFactory> {
  const bitcoinInstance = getNetworkInstance(provider, Networks.BTC);
  const { BTCSigner } = await dynamicImportWithRefinedError(
    async () => await import('./signers/utxoSigner.js')
  );
  const signers = new DefaultSignerFactory();
  signers.registerSigner(TxType.TRANSFER, new BTCSigner(bitcoinInstance));
  return signers;
}
