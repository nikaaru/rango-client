import { styled } from '@nikaru-dev/ui';

export const MainContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: '$widget',
  boxSizing: 'border-box',
  textAlign: 'left',

  '& *, *::before, *::after': {
    boxSizing: 'inherit',
  },
  '& *:focus-visible': {
    outlineColor: '$info500',
    transition: 'none',
  },
  '& ul, ol, li': { listStyleType: 'none' },
});
