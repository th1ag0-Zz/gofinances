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
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard: React.FC = () => {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de Sites',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: '13/04/2021',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Desenvolvimento de Sites',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'coffee' },
      date: '13/04/2021',
    },
    {
      id: '3',
      type: 'positive',
      title: 'Desenvolvimento de Sites',
      amount: 'R$ 12.000,00',
      category: { name: 'Vendas', icon: 'shopping-bag' },
      date: '13/04/2021',
    },
  ];

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

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
