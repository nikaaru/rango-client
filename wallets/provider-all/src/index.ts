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
import * as mathwallet from '@nikaru-dev/provider-math-wallet';
import * as metamask from '@nikaru-dev/provider-metamask';
import * as okx from '@nikaru-dev/provider-okx';
import * as phantom from '@nikaru-dev/provider-phantom';
import * as safe from '@nikaru-dev/provider-safe';
import * as safepal from '@nikaru-dev/provider-safepal';
import * as taho from '@nikaru-dev/provider-taho';
import * as tokenpocket from '@nikaru-dev/provider-tokenpocket';
import * as tronLink from '@nikaru-dev/provider-tron-link';
import * as trustwallet from '@nikaru-dev/provider-trustwallet';
import * as walletconnect2 from '@nikaru-dev/provider-walletconnect-2';
import * as xdefi from '@nikaru-dev/provider-xdefi';

type Enviroments = Record<string, Record<string, string>>;

export const allProviders = (enviroments?: Enviroments) => {
  walletconnect2.init(enviroments?.walletconnect2 || {});

  return [
    safe,
    defaultInjected,
    metamask,
    walletconnect2,
    keplr,
    phantom,
    argentx,
    tronLink,
    trustwallet,
    bitget,
    enkrypt,
    xdefi,
    clover,
    safepal,
    brave,
    coin98,
    coinbase,
    cosmostation,
    exodus,
    mathwallet,
    okx,
    tokenpocket,
    halo,
    leapCosmos,
    frontier,
    taho,
    braavos,
  ];
};
