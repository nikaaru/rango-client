import type { Options } from './wallet';
import type { Network } from '@nikaru-dev/wallets-shared';

export function formatAddressWithNetwork(
  address: string,
  network?: Network | null
) {
  return `${network || ''}:${address}`;
}

export function accountAddressesWithNetwork(
  addresses: string[] | null,
  network?: Network | null
) {
  if (!addresses) {
    return [];
  }

  return addresses.map((address) => {
    return formatAddressWithNetwork(address, network);
  });
}

export function readAccountAddress(addressWithNetwork: string): {
  address: string;
  network: Network;
} {
  const [network, address] = addressWithNetwork.split(':');

  return {
    network,
    address,
  };
}

export function needsCheckInstallation(options: Options) {
  const { checkInstallation = true } = options.config;
  return checkInstallation;
}
