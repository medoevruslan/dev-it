import { Provider } from 'react-redux';

import { Meta, StoryObj } from '@storybook/react';

import { Signin } from './';
import { withRouter } from 'storybook-addon-react-router-v6';
import { store } from '../../services/store';

const meta = {
  component: Signin,
  decorators: [
    withRouter,
    (story) => <Provider store={store}>{story()}</Provider>,
  ],
  tags: ['autodocs'],
  title: 'Pages/Signin',
} satisfies Meta<typeof Signin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SigninPage: Story = {
  render: () => {
    return <Signin />;
  },
};
