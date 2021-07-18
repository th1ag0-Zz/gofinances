import React from 'react';
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/th1ag0-Zz.png' }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Thiago</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$ 25.000,00"
          lastTransaction="Útima entrada dia 13 de Abril"
        />
        <HighlightCard
          type="down"
          title="Saída"
          amount="R$ 18.000,00"
          lastTransaction="Útima saída dia 10 de Abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 25.000,00"
          lastTransaction="01 à 16 de Abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionCard />
      </Transactions>
    </Container>
  );
};
