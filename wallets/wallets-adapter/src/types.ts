import type { Providers } from '@nikaru-dev/wallets-react';
import type {
  Network,
  WalletInfo,
  WalletType,
} from '@nikaru-dev/wallets-shared';
import type { SignerFactory } from 'rango-types';

export interface State {
  connected: boolean;
  connecting: boolean;
  reachable: boolean;
  installed: boolean;
  accounts: string[] | null;
  network: Network | null;
}

export type ProviderContext = {
  onOpenModal: () => void;
  onCloseModal: () => void;
  disconnectAll(): Promise<PromiseSettledResult<any>[]>;
  canSwitchNetworkTo(type: WalletType, network: Network): boolean;
  providers(): Providers;
  getSigners(type: WalletType): SignerFactory;
  getWalletInfo(type: WalletType): WalletInfo;
};

export interface ModalState {
  open: boolean;
}
