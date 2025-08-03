import type { Provider } from '../utils.js';
import type { SignerFactory } from 'rango-types';

import { LegacyNetworks as Networks } from '@nikaru-dev/wallets-core/legacy';
import { getNetworkInstance } from '@nikaru-dev/wallets-shared';
import { DefaultSignerFactory, TransactionType as TxType } from 'rango-types';

export default async function getSigners(
  provider: Provider
): Promise<SignerFactory> {
  const ethProvider = getNetworkInstance(provider, Networks.ETHEREUM);
  const solProvider = getNetworkInstance(provider, Networks.SOLANA);

  const signers = new DefaultSignerFactory();
  const { DefaultEvmSigner } = await import('@nikaru-dev/signer-evm');
  const { CustomSolanaSigner } = await import('./signers/solanaSigner.js');

  signers.registerSigner(TxType.EVM, new DefaultEvmSigner(ethProvider));
  signers.registerSigner(TxType.SOLANA, new CustomSolanaSigner(solProvider));

  return signers;
}
