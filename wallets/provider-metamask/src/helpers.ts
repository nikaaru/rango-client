import { getCoinbaseInstance } from '@nikaru-dev/wallets-shared';

export function metamask() {
  const isCoinbaseWalletAvailable = !!getCoinbaseInstance();
  const { ethereum } = window;

  // Some wallets overriding the metamask. So we need to get it properly.
  if (isCoinbaseWalletAvailable) {
    // Getting intance from overrided structure from coinbase.
    return getCoinbaseInstance('metamask');
  }
  if (!!ethereum && ethereum.isMetaMask) {
    return ethereum;
  }

  return null;
}
