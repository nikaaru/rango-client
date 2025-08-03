import type { VersionedProviders } from '@nikaru-dev/wallets-core/utils';
import type { ProviderInterface } from '@nikaru-dev/wallets-react';
import type { WalletType, WalletTypes } from '@nikaru-dev/wallets-shared';

export const isWalletExcluded = (
  providers: (WalletType | ProviderInterface)[],
  wallet: { name: string; type: WalletTypes }
) => {
  return (
    providers.length &&
    !providers.find((provider) =>
      typeof provider === 'string'
        ? provider === wallet.type
        : provider.getWalletInfo([]).name === wallet.name
    )
  );
};

export const lazyProvider = (provider: VersionedProviders) => () => provider;
