import { Wrapper, StatusText, GuideText } from './ServerError.style';

const ServerError = ({ status }) => {
  return (
    <Wrapper>
      <StatusText>
        {status}
        <span> Error!</span>
      </StatusText>
      <GuideText>please try again</GuideText>
    </Wrapper>
  );
};

export default ServerError;
