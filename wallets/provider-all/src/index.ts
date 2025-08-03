import type { Environments as TonConnectEnvironments } from '@nikaru-dev/provider-tonconnect';
import type { Environments as TrezorEnvironments } from '@nikaru-dev/provider-trezor';
import type { Environments as WalletConnectEnvironments } from '@nikaru-dev/provider-walletconnect-2';
import type { ProviderInterface } from '@nikaru-dev/wallets-react';

import * as argentx from '@nikaru-dev/provider-argentx';
import * as bitget from '@nikaru-dev/provider-bitget';
import * as braavos from '@nikaru-dev/provider-braavos';
import * as brave from '@nikaru-dev/provider-brave';
import * as clover from '@nikaru-dev/provider-clover';
import * as coin98 from '@nikaru-dev/provider-coin98';
import * as coinbase from '@nikaru-dev/provider-coinbase';
import * as cosmostation from '@nikaru-dev/provider-cosmostation';
import * as defaultInjected from '@nikaru-dev/provider-default';
import * as enkrypt from '@nikaru-dev/provider-enkrypt';
import * as exodus from '@nikaru-dev/provider-exodus';
import * as frontier from '@nikaru-dev/provider-frontier';
import * as halo from '@nikaru-dev/provider-halo';
import * as keplr from '@nikaru-dev/provider-keplr';
import * as leapCosmos from '@nikaru-dev/provider-leap-cosmos';
import * as ledger from '@nikaru-dev/provider-ledger';
import * as mathwallet from '@nikaru-dev/provider-math-wallet';
import * as metamask from '@nikaru-dev/provider-metamask';
import * as okx from '@nikaru-dev/provider-okx';
import { versions as phantom } from '@nikaru-dev/provider-phantom';
import { versions as rabby } from '@nikaru-dev/provider-rabby';
import * as safe from '@nikaru-dev/provider-safe';
import * as safepal from '@nikaru-dev/provider-safepal';
import { versions as slush } from '@nikaru-dev/provider-slush';
import * as solflare from '@nikaru-dev/provider-solflare';
import * as taho from '@nikaru-dev/provider-taho';
import * as tokenpocket from '@nikaru-dev/provider-tokenpocket';
import * as tomo from '@nikaru-dev/provider-tomo';
import * as tonconnect from '@nikaru-dev/provider-tonconnect';
import * as trezor from '@nikaru-dev/provider-trezor';
import * as tronLink from '@nikaru-dev/provider-tron-link';
import { versions as trustwallet } from '@nikaru-dev/provider-trustwallet';
import { versions as unisat } from '@nikaru-dev/provider-unisat';
import * as walletconnect2 from '@nikaru-dev/provider-walletconnect-2';
import * as xdefi from '@nikaru-dev/provider-xdefi';
import {
  legacyProviderImportsToVersionsInterface,
  type VersionedProviders,
} from '@nikaru-dev/wallets-core/utils';
import { type WalletType, WalletTypes } from '@nikaru-dev/wallets-shared';

import { isWalletExcluded, lazyProvider } from './helpers.js';

interface Options {
  walletconnect2: WalletConnectEnvironments;
  selectedProviders?: (WalletType | ProviderInterface)[];
  trezor?: TrezorEnvironments;
  tonConnect?: TonConnectEnvironments;
}

export const allProviders = (
  options?: Options
): (() => VersionedProviders)[] => {
  const providers = options?.selectedProviders || [];

  if (
    !isWalletExcluded(providers, {
      type: WalletTypes.WALLET_CONNECT_2,
      name: 'WalletConnect',
    })
  ) {
    if (!!options?.walletconnect2?.WC_PROJECT_ID) {
      walletconnect2.init(options.walletconnect2);
    } else {
      throw new Error(
        'WalletConnect has been included in your providers. Passing a Project ID is required. Make sure you are passing "WC_PROJECT_ID".'
      );
    }
  }

  if (
    !isWalletExcluded(providers, {
      type: WalletTypes.TREZOR,
      name: 'Trezor',
    })
  ) {
    if (!!options?.trezor?.manifest) {
      trezor.init(options.trezor);
    }
  }

  if (
    !isWalletExcluded(providers, {
      type: WalletTypes.TON_CONNECT,
      name: 'tonconnect',
    })
  ) {
    if (!!options?.tonConnect?.manifestUrl) {
      tonconnect.init(options.tonConnect);
    }
  }

  return [
    lazyProvider(legacyProviderImportsToVersionsInterface(safe)),
    lazyProvider(legacyProviderImportsToVersionsInterface(defaultInjected)),
    lazyProvider(legacyProviderImportsToVersionsInterface(metamask)),
    lazyProvider(legacyProviderImportsToVersionsInterface(walletconnect2)),
    lazyProvider(legacyProviderImportsToVersionsInterface(tonconnect)),
    lazyProvider(legacyProviderImportsToVersionsInterface(keplr)),
    phantom,
    lazyProvider(legacyProviderImportsToVersionsInterface(argentx)),
    lazyProvider(legacyProviderImportsToVersionsInterface(tronLink)),
    trustwallet,
    lazyProvider(legacyProviderImportsToVersionsInterface(bitget)),
    lazyProvider(legacyProviderImportsToVersionsInterface(enkrypt)),
    lazyProvider(legacyProviderImportsToVersionsInterface(xdefi)),
    lazyProvider(legacyProviderImportsToVersionsInterface(clover)),
    lazyProvider(legacyProviderImportsToVersionsInterface(safepal)),
    lazyProvider(legacyProviderImportsToVersionsInterface(brave)),
    lazyProvider(legacyProviderImportsToVersionsInterface(coin98)),
    lazyProvider(legacyProviderImportsToVersionsInterface(coinbase)),
    lazyProvider(legacyProviderImportsToVersionsInterface(cosmostation)),
    lazyProvider(legacyProviderImportsToVersionsInterface(exodus)),
    lazyProvider(legacyProviderImportsToVersionsInterface(mathwallet)),
    lazyProvider(legacyProviderImportsToVersionsInterface(okx)),
    lazyProvider(legacyProviderImportsToVersionsInterface(tokenpocket)),
    lazyProvider(legacyProviderImportsToVersionsInterface(tomo)),
    lazyProvider(legacyProviderImportsToVersionsInterface(halo)),
    lazyProvider(legacyProviderImportsToVersionsInterface(leapCosmos)),
    lazyProvider(legacyProviderImportsToVersionsInterface(frontier)),
    lazyProvider(legacyProviderImportsToVersionsInterface(taho)),
    lazyProvider(legacyProviderImportsToVersionsInterface(braavos)),
    lazyProvider(legacyProviderImportsToVersionsInterface(ledger)),
    rabby,
    lazyProvider(legacyProviderImportsToVersionsInterface(trezor)),
    lazyProvider(legacyProviderImportsToVersionsInterface(solflare)),
    slush,
    unisat,
  ];
};
