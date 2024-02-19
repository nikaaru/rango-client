import type { SignerFactory } from 'rango-types';

import { DefaultSolanaSigner } from '@nikaru-dev/signer-solana';
import { getNetworkInstance, Networks } from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default function getSigners(provider: any): SignerFactory {
  const solProvider = getNetworkInstance(provider, Networks.SOLANA);
  const signers = new DefaultSignerFactory();
  signers.registerSigner(TxType.SOLANA, new DefaultSolanaSigner(solProvider));
  return signers;
}
