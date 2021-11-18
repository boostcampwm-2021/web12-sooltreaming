import React from 'react';
import { Wrapper } from '@components/room/scaffold/Voters.style';
import { VoterIcon } from '@components/icons';
import { COLOR } from '@constant/style';

type VotersPropType = {
  total: number;
  approves: number;
  rejects: number;
};

const Voters: React.FC<VotersPropType> = ({ total, approves, rejects }) => {
  return (
    <Wrapper>
      {Array.from({ length: total }, (_, index) => {
        let color = COLOR.body;
        if (index < approves) color = COLOR.titleActive;
        if (index > total - rejects - 1) color = COLOR.error;
        return <VoterIcon key={`${color}-${index}`} stroke={color} />;
      })}
    </Wrapper>
  );
};

export default Voters;
