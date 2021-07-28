import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './styles';
import { categories } from '../../utils/categories';
import { useFocusEffect } from '@react-navigation/core';

import { useAuth } from '../../hooks/useAuth';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormated: string;
  color: string;
  percent: string;
}

export const Resume: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsloading] = useState(false);

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = addMonths(selectedDate, -1);
      setSelectedDate(newDate);
    }
  }

  async function loadData() {
    setIsloading(true);
    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const response = await AsyncStorage.getItem(dataKey);
      const responseFormated = response ? JSON.parse(response) : [];

      const expensives = responseFormated.filter(
        (expensive: TransactionData) =>
          expensive.type === 'negative' &&
          new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
          new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
      );

      const expensivesTotal = expensives.reduce(
        (acumullator: number, expensive: TransactionData) => {
          return acumullator + Number(expensive.amount);
        },
        0,
      );

      const totalByCategory: CategoryData[] = [];

      categories.forEach(category => {
        let categorySum = 0;

        expensives.forEach((expensive: TransactionData) => {
          if (expensive.category === category.key) {
            categorySum += Number(expensive.amount);
          }
        });

        if (categorySum > 0) {
          const total = categorySum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
            0,
          )}%`;

          totalByCategory.push({
            key: category.key,
            name: category.name,
            totalFormated: total,
            total: categorySum,
            color: category.color,
            percent,
          });
        }
      });

      setTotalByCategories(totalByCategory);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator size="large" color={colors.secondary} />
          </LoadContainer>
        ) : (
          <>
            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                x="percent"
                y="total"
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: colors.shape,
                  },
                }}
                labelRadius={50}
              />
            </ChartContainer>

            {totalByCategories.map(item => (
              <HistoryCard
                title={item.name}
                key={item.key}
                amount={item.totalFormated}
                color={item.color}
              />
            ))}
          </>
        )}
      </Content>
    </Container>
  );
};
