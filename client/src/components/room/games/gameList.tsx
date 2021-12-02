import { UpdownGameIcon, LiarGameIcon, RandomPickGameIcon } from '@components/icons';
import { LIAR, UP_DOWN, RANDOM_PICK } from 'sooltreaming-domain/constant/gameName';

export const gameList = [
  {
    icon: <UpdownGameIcon />,
    title: UP_DOWN,
    content: (
      <div>
        업다운 게임은 주최자에게 주어진 숫자를 맞히는 게임입니다.
        <br />
        <br /> <b>1-50</b> 사이의 숫자가 게임의 주최자에게 주어집니다. <br />
        나머지 플레이어들은 돌아가면서 숫자를 말합니다. <br />
        주최자는 해당 숫자가 정답보다 크면 <b>'up'</b>, 작으면 <b>'down'</b>을 말합니다.
        <br /> N 바퀴를 돌 때까지 숫자를 못 맞히면 주최자 승리! <br />
        숫자를 맞히면 참가자 승리! <br />
        <br />※ 추가적인 벌칙, 승리는 참가자들이 자유롭게 정할 수 있습니다.
      </div>
    ),
  },
  {
    icon: <LiarGameIcon />,
    title: LIAR,
    content: (
      <div>
        라이어 게임은 라이어를 찾는 게임입니다. <br />
        <br />
        게임을 시작하면 참가자 전원에게 키워드가 적힌 카드가 주어집니다. <br />
        그중 단 한 명은 키워드가 없는 <b>'라이어'</b> 카드가 주어집니다. <br />
        참가자들은 돌아가면서 자신이 받은 키워드에 대하여 설명합니다. <br />
        모두가 설명이 끝나면 라이어를 찾습니다. <br />
        <br />
        라이어를 맞히면 참가자 승리! <br />못 맞히면 라이어 승리!
        <br />
        <br />
        <br />※ 추가적인 벌칙, 승리는 참가자들이 자유롭게 정할 수 있습니다.
      </div>
    ),
  },
  {
    icon: <RandomPickGameIcon />,
    title: RANDOM_PICK,
    content: (
      <div>
        랜덤픽 게임은 랜덤한 사람 1명을 뽑아주는 게임입니다. <br />
        <br />
        게임을 시작하면 방에 접속해있는 사람들 중 1명이 선정됩니다.
        <br />
        <br />※ 추가적인 벌칙, 승리는 참가자들이 자유롭게 정할 수 있습니다.
      </div>
    ),
  },
];
