import React from 'react';
import { Alert } from 'react-native';
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
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
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
          <SignInSocialButton
            svg={AppeSvg}
            title="Entrar com Apple"
            onPress={() => {}}
          />
        </FooterWraper>
      </Footer>
    </Container>
  );
};
