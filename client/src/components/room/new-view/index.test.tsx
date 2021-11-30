/* eslint-disable */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import RoomModal from './index';

/*

태스크
1. creat a room View의 요소들이 제대로 렌더링이 되었는가?
2. RoomTypeCheckBox를 클릭하면 클릭한 요소애 맞게 선택이된다.
3. AnonymousCheckBox를 클릭하면 체크박스가 활성화된다.
4. TitleInputbar를 입력하면 제목이 제대로 입력이 되는가?
5. let's go를 클릭하면 제대로 동작하는가?
6. Randomly assigned를 클릭하면 제대로 동작하는가?

*/

function renderRoomModal() {
  const result = render(<RecoilRoot><RoomModal /></RecoilRoot>);

  const Title = () => result.getByText(`Let's have fun together!`);
  const TitleInputbar = () => result.getByTestId('TitleInputbar') as HTMLInputElement;
  const LetsGoBtn = () => result.getByText(`Let's Go`);

  function changeTitle(title: string) {
    userEvent.type(TitleInputbar(), title);
  }

  return {
    result,
    Title,
    TitleInputbar,
    LetsGoBtn,
    changeTitle,
  };
}


describe('RoomModal 테스트', () => {
    it('creat a room View의 요소들이 제대로 렌더링이 되었는가?', async () => {
        const { Title, TitleInputbar, LetsGoBtn } = renderRoomModal();

        expect(Title()).toBeInTheDocument();
        expect(TitleInputbar()).toBeInTheDocument();
        expect(LetsGoBtn()).toBeInTheDocument();
    })

    it('TitleInputbar를 입력하면 제목이 제대로 입력이 되는가?', async () => {
        const { changeTitle, TitleInputbar } = renderRoomModal();
        
        expect(TitleInputbar().value).toBe('');

        changeTitle('title');

        expect(TitleInputbar().value).toBe('title');
    })
});