import type { SwitchPropTypes } from '@nikaru-dev/ui';
import type { Meta } from '@storybook/react';

import { Switch } from '@nikaru-dev/ui';
import React from 'react';

export default {
  title: 'Components/Switch',
  component: Switch,

  argTypes: {
    onChange: {
      type: 'function',
    },
    checked: {
      control: { type: 'boolean' },
      type: 'boolean',
    },
  },
} as Meta<typeof Switch>;

export const Main = (args: SwitchPropTypes) => <Switch {...args} />;
