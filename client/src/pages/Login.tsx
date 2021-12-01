import React from 'react';
import { FullScreen, LogoBox, LoginLink, ButtonsDiv, Title } from '@pages/Login.style';
import { GITHUB_ID, NAVER_ID, NAVER_REDIRECT_URL } from '@constant/envs';
const githubUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_ID}`;
const naverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_ID}&redirect_url=${NAVER_REDIRECT_URL}`;

const Login: React.FC = (): React.ReactElement => {
  return (
    <FullScreen>
      <LogoBox>
        <img src="/images/logo.png" alt="logo" loading="lazy" />
        <span>Sooltreaming</span>
      </LogoBox>
      <ButtonsDiv>
        <LoginLink href={githubUrl}>
          <img src={'/images/github-login.png'} alt="github login" loading="lazy" />
        </LoginLink>
        <LoginLink href={naverUrl}>
          <img src={'/images/naver-login.png'} alt="naver login" loading="lazy" />
        </LoginLink>
      </ButtonsDiv>
      <Title>
        재ㅁㅣ있는 술자.ㄹㅣ;를 위한
        <span> 화상ㅊㅐ팅 </span>
        애플ㄹ케.2션
      </Title>
    </FullScreen>
  );
};

export default Login;
