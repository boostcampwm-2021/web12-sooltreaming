import { Container, StatusText, GuideText } from './ServerError.style';

const ServerError = ({ status }): React.ReactElement => {
  return (
    <Container>
      <StatusText>
        {status}
        <span> Error!</span>
      </StatusText>
      <GuideText>please try again</GuideText>
    </Container>
  );
};

export default ServerError;
