import type { SignerFactory } from 'rango-types';

import { DefaultEvmSigner } from '@nikaru-dev/signer-evm';
import { DefaultSolanaSigner } from '@nikaru-dev/signer-solana';
import { getNetworkInstance, Networks } from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default function getSigners(provider: any): SignerFactory {
  const ethProvider = getNetworkInstance(provider, Networks.ETHEREUM);
  const solProvider = getNetworkInstance(provider, Networks.SOLANA);
  const signers = new DefaultSignerFactory();
  signers.registerSigner(TxType.EVM, new DefaultEvmSigner(ethProvider));
  signers.registerSigner(TxType.COSMOS, new DefaultSolanaSigner(solProvider));
  return signers;
}
