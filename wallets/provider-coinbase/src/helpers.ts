import type { ProviderConnectResult } from '@nikaru-dev/wallets-shared';

import { Networks } from '@nikaru-dev/wallets-shared';

export async function getSolanaAccounts(
  instance: any
): Promise<ProviderConnectResult[]> {
  const solanaInstance = await instance.get(Networks.SOLANA);
  const results: ProviderConnectResult[] = [];

  if (solanaInstance) {
    await solanaInstance.connect();
    const account = solanaInstance.publicKey.toString();

    results.push({
      accounts: account ? [account] : [],
      chainId: Networks.SOLANA,
    });
  }

  return results;
}
