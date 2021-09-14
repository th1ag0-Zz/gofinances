import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import { AuthProvider } from '../../hooks/useAuth';
import { Register } from '../../screens/Register';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {/* <AuthProvider>{children}</AuthProvider> */}
    {children}
  </ThemeProvider>
);

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('Register Screen', () => {
  it('should be open category modal', () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const modalCategory = getByTestId('modal-category');
    expect(modalCategory.props.visible).toBeFalsy();

    const categorySelectButton = getByTestId('category-select');
    fireEvent.press(categorySelectButton);
    expect(modalCategory.props.visible).toBeTruthy();
  });
});
