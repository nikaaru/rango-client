import { styled } from '@nikaru-dev/ui';

export const Blockchains = styled('div', {
  display: 'grid',
  gap: '$10',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
});
