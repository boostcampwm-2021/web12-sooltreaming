import React from 'react';
import {
  DataTable,
  DataRow,
  Title,
  Data,
} from '@components/user-information/information/UserData.style';
import { filterDate } from '@utils/date';

const UNITS = {
  createdAt: (value) => ['가입 일자', `${filterDate(value)}`],
  chatCount: (value) => ['총 채팅 횟수', `${value}번`],
  hookCount: (value) => ['갈고리 사용 횟수', `${value}번`],
  pollCount: (value) => ['투표 선정 횟수', `${value}번`],
  closeupCount: (value) => ['클로즈업 횟수', `${value}번`],
  dieCount: (value) => ['단두대 횟수', `${value}회`],
  cheersCount: (value) => ['건배 횟수', `${value}회`],
  starterCount: (value) => ['게임 주최 횟수', `${value}번`],
  totalSeconds: (value) => ['총 접속 시간', `${value}초`],
};

const UserData = ({ userInformation }): React.ReactElement => {
  return (
    <DataTable>
      <tbody>
        {Object.entries(userInformation).map(([key, value], index) => {
          const [title, amount] = UNITS[key](value);
          return (
            <DataRow key={index}>
              <Title>{title}</Title>
              <td>
                <Data>{amount}</Data>
              </td>
            </DataRow>
          );
        })}
      </tbody>
    </DataTable>
  );
};

export default UserData;
