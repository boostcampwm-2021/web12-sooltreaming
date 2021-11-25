import { DataList, DataItem } from '@components/user-information/information/UserData.style';

const UNITS = {
  createdAt: (value) => `가입 일자 : ${value}`,
  chatCount: (value) => `총 채팅 횟수 : ${value}번`,
  hookCount: (value) => `갈고리 사용 횟수 : ${value}번`,
  pollCount: (value) => `투표 선정 횟수 : ${value}번`,
  closeupCount: (value) => `클로즈업 횟수 : ${value}번`,
  dieCount: (value) => `단두대 횟수 : ${value}회 (%)`,
  speakCount: (value) => `건배사 횟수 : ${value}회`,
  starterCount: (value) => `게임 주최 횟수 : ${value}번`,
  totalSeconds: (value) => `총 접속 시간 : ${value}초`,
};

const UserData = ({ userInformation }) => {
  return (
    <DataList>
      {Object.entries(userInformation).map(([key, value], index) => {
        return (
          <DataItem key={index}>
            <p>{UNITS[key](value)}</p>
          </DataItem>
        );
      })}
    </DataList>
  );
};

export default UserData;
