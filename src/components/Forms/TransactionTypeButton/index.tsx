import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export const TransactionTypeButton: React.FC<Props> = ({
  type,
  title,
  isActive,
  ...rest
}) => {
  return (
    <Container {...rest} type={type} isActive={isActive}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  );
};
