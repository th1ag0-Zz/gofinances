import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface Props extends TextInputProps {
  active?: boolean;
}

export const Input: React.FC<Props> = ({ active = false, ...rest }) => {
  return <Container active={active} {...rest} />;
};
