import type { SwapStorage } from '../types';
import type { ExecuterActions } from '@nikaru-dev/queue-manager-core';

import { notifier } from '../services/eventEmitter';
import { StepEventType, SwapActionTypes } from '../types';

export function start({
  schedule,
  next,
  getStorage,
}: ExecuterActions<SwapStorage, SwapActionTypes>): void {
  const swap = getStorage().swapDetails;

  notifier({ event: { type: StepEventType.STARTED }, swap, step: null });

  schedule(SwapActionTypes.SCHEDULE_NEXT_STEP);
  next();
}
