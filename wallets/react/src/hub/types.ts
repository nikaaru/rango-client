import type {
  CommonNamespaces,
  FindProxiedNamespace,
  ProviderMetadata,
} from '@nikaru-dev/wallets-core';

export type AllProxiedNamespaces = FindProxiedNamespace<
  keyof CommonNamespaces,
  CommonNamespaces
>;

export type ExtensionLink = keyof ProviderMetadata['extensions'];
