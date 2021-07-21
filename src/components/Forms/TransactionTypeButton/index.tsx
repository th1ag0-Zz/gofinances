import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, Button, Icon } from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
};

interface Props extends RectButtonProps {
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
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
};
