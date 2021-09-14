import React from 'react';
import { render } from '@testing-library/react-native';

import { Input } from '../../../components/Forms/Input';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Input Component', () => {
  it('must have specific border color when active', () => {
    const { getByTestId } = render(
      <Input testID="text-input" active={true} />,
      {
        wrapper: Providers,
      },
    );

    const input = getByTestId('text-input');

    expect(input.props.style[0].borderColor).toEqual(theme.colors.attention);
  });
});
