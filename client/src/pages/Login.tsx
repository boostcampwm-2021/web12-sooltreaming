import React from 'react';
import { Wrapper, LogoDiv, LoginButton, ButtonsDiv, TitleDiv } from './Login.style';

const Login: React.FC = () => {
  return (
    <Wrapper>
      <LogoDiv>
        <img src="/images/logo.png" />
        <span>Sooltreaming</span>
      </LogoDiv>
      <ButtonsDiv>
        <LoginButton>
          <img src={'/images/github-login.png'} />
        </LoginButton>
        <LoginButton>
          <img src={'/images/naver-login.png'} />
        </LoginButton>
      </ButtonsDiv>
      <TitleDiv>
        재ㅁㅣ있는 술자.ㄹㅣ;를 위한
        <span> 화상ㅊㅐ팅 </span>
        애플ㄹ케.2션
      </TitleDiv>
    </Wrapper>
  );
};

export default Login;
