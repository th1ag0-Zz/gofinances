import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { Dashboard } from './src/screens/Dashboard';
import theme from './src/global/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <StatusBar barStyle="default" /> */}
      <Dashboard />
    </ThemeProvider>
  );
}
