import type { SignerFactory } from 'rango-types';

import { dynamicImportWithRefinedError } from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default async function getSigners(
  provider: unknown
): Promise<SignerFactory> {
  const signers = new DefaultSignerFactory();
  const { DefaultTerraSigner } = await dynamicImportWithRefinedError(
    async () => await import('@nikaru-dev/signer-terra')
  );
  signers.registerSigner(TxType.COSMOS, new DefaultTerraSigner(provider));
  return signers;
}
