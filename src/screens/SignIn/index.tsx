import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../hooks/useAuth';

import AppeSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWraper,
  Title,
  SignInTitle,
  Footer,
  FooterWraper,
} from './styles';

export const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWraper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>{'Controle suas\nfinanças de forma\nmuito simples'}</Title>
        </TitleWraper>

        <SignInTitle>{'Faça seu login com\numa das contas abaixo'}</SignInTitle>
      </Header>

      <Footer>
        <FooterWraper>
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              svg={AppeSvg}
              title="Entrar com Apple"
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWraper>

        {isLoading && (
          <ActivityIndicator
            size="large"
            color={colors.shape}
            style={{ marginTop: 14 }}
          />
        )}
      </Footer>
    </Container>
  );
};
