import React from 'react';
import { Wrapper, LogoDiv, LoginLink, ButtonsDiv, TitleDiv } from './Login.style';
import { GITHUB_ID } from '@constant/envs';

const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}`;

const Login: React.FC = () => {
  return (
    <Wrapper>
      <LogoDiv>
        <img src="/images/logo.png" />
        <span>Sooltreaming</span>
      </LogoDiv>
      <ButtonsDiv>
        <LoginLink href={githubUrl}>
          <img src={'/images/github-login.png'} />
        </LoginLink>
        <LoginLink href="">
          <img src={'/images/naver-login.png'} />
        </LoginLink>
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
