import type { NeedsNamespacesState } from '../../hooks/useStatefulConnect';
import type { Namespace } from '@nikaru-dev/wallets-core/namespaces/common';

export interface PropTypes {
  value: NeedsNamespacesState;
  onConfirm: () => void;
  onDisconnectWallet: () => void;
  selectedNamespaces: Namespace[] | null;
}
