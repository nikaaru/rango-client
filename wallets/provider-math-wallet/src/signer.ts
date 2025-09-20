import type { LegacyNetworkProviderMap } from '@nikaru-dev/wallets-core/legacy';
import type { SignerFactory } from 'rango-types';

import { DefaultSolanaSigner } from '@nikaru-dev/signer-solana';
import {
  dynamicImportWithRefinedError,
  getNetworkInstance,
  Networks,
} from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default async function getSigners(
  provider: LegacyNetworkProviderMap
): Promise<SignerFactory> {
  const ethProvider = getNetworkInstance(provider, Networks.ETHEREUM);
  const solProvider = getNetworkInstance(provider, Networks.SOLANA);
  const cosmosProvider = getNetworkInstance(provider, Networks.COSMOS);

  const signers = new DefaultSignerFactory();
  const { DefaultEvmSigner } = await dynamicImportWithRefinedError(
    async () => await import('@nikaru-dev/signer-evm')
  );
  const { MathWalletCosmosSigner } = await dynamicImportWithRefinedError(
    async () => await import('./signers/cosmosSigner.js')
  );

  if (!!ethProvider) {
    signers.registerSigner(TxType.EVM, new DefaultEvmSigner(ethProvider));
  }
  if (!!solProvider) {
    signers.registerSigner(TxType.SOLANA, new DefaultSolanaSigner(solProvider));
  }
  if (!!cosmosProvider) {
    signers.registerSigner(
      TxType.COSMOS,
      new MathWalletCosmosSigner(cosmosProvider)
    );
  }

  return signers;
}
