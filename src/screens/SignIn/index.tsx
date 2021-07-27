import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

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
          <SignInSocialButton svg={GoogleSvg} title="Entrar com Google" />
          <SignInSocialButton svg={AppeSvg} title="Entrar com Apple" />
        </FooterWraper>
      </Footer>
    </Container>
  );
};
