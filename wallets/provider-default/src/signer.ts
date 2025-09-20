import type { ProviderAPI } from '@nikaru-dev/wallets-core/namespaces/evm';
import type { SignerFactory } from 'rango-types';

import { dynamicImportWithRefinedError } from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default async function getSigners(
  provider: ProviderAPI
): Promise<SignerFactory> {
  const signers = new DefaultSignerFactory();
  const { DefaultEvmSigner } = await dynamicImportWithRefinedError(
    async () => await import('@nikaru-dev/signer-evm')
  );
  signers.registerSigner(TxType.EVM, new DefaultEvmSigner(provider));
  return signers;
}
