import { Container, Spinner } from './Loading.style';

const Loading = () => {
  return (
    <Container>
      <Spinner>
        <img src="/images/logo.png" alt="logo" />
      </Spinner>
    </Container>
  );
};

export default Loading;
