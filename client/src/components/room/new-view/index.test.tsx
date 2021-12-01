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
3. closed 버튼을 클릭하면 anonymous 체크박스가 비활성화된다.
4. TitleInputbar를 입력하면 제목이 제대로 입력이 되는가?
5. let's go를 클릭하면 제대로 동작하는가?
6. Randomly assigned를 클릭하면 제대로 동작하는가?

*/

function renderRoomModal() {
  const result = render(<RecoilRoot><RoomModal /></RecoilRoot>);

  const Title = () => result.getByText(`Let's have fun together!`);
  const PublicCheckbox = () => result.getByText('public') as HTMLButtonElement;
  const ClosedCheckbox = () => result.getByText('closed') as HTMLButtonElement;
  const AnonymousCheckbox = () => result.getByLabelText('Allow anonymous ?') as HTMLInputElement;
  const TitleInputLabel = () => result.getByText('Add a Room Title');
  const TitleInputbar = () => result.getByTestId('TitleInputbar') as HTMLInputElement;
  const LetsGoBtn = () => result.getByText(`Let's Go`);
  const RandomBtn = () => result.getByText(`Randomly assigned`);

  function changeTitle(title: string) {
    userEvent.type(TitleInputbar(), title);
  }

  async function clickPublic() {
    await act(async () => {
      userEvent.click(PublicCheckbox());
    });
  }

  async function clickClosed() {
    await act(async () => {
      userEvent.click(ClosedCheckbox());
    });
  }

  function clickLetsGoBtn() {
    userEvent.click(LetsGoBtn());
  }

  function clickRandomBtn() {
    userEvent.click(RandomBtn());
  }


  return {
    result,
    Title,
    PublicCheckbox,
    ClosedCheckbox,
    AnonymousCheckbox,
    TitleInputLabel,
    TitleInputbar,
    LetsGoBtn,
    RandomBtn,
    changeTitle,
    clickPublic,
    clickClosed,
    clickLetsGoBtn,
    clickRandomBtn
  };
}


describe('RoomModal 테스트', () => {
    it('creat a room View의 요소들이 제대로 렌더링이 되었는가?', async () => {
        const { 
          Title, PublicCheckbox, ClosedCheckbox, AnonymousCheckbox,
          TitleInputLabel, TitleInputbar, LetsGoBtn, RandomBtn,  
        } = renderRoomModal();

        expect(Title()).toBeInTheDocument();
        expect(PublicCheckbox()).toBeInTheDocument();
        expect(ClosedCheckbox()).toBeInTheDocument();
        expect(AnonymousCheckbox()).toBeInTheDocument();
        expect(TitleInputLabel()).toBeInTheDocument();
        expect(TitleInputbar()).toBeInTheDocument();
        expect(LetsGoBtn()).toBeInTheDocument();
        expect(RandomBtn()).toBeInTheDocument();
    })

    it('RoomTypeCheckBox를 클릭하면 클릭한 요소애 맞게 선택이된다.', async () => {
      const { clickPublic, clickClosed } = renderRoomModal();
      let test = document.querySelectorAll('button');
      let style = window.getComputedStyle(test[0]);
      let style2 = window.getComputedStyle(test[1]);

      expect(style.backgroundColor).toBe(`rgb(216, 224, 235)`);
      expect(style2.backgroundColor).toBe(`rgb(245, 245, 245)`);

      await clickClosed();
      
      test = document.querySelectorAll('button');
      style = window.getComputedStyle(test[0]);
      style2 = window.getComputedStyle(test[1]);

      expect(style.backgroundColor).toBe(`rgb(245, 245, 245)`);
      expect(style2.backgroundColor).toBe(`rgb(216, 224, 235)`);

      await clickPublic();
      
      test = document.querySelectorAll('button');
      style = window.getComputedStyle(test[0]);
      style2 = window.getComputedStyle(test[1]);

      expect(style.backgroundColor).toBe(`rgb(216, 224, 235)`);
      expect(style2.backgroundColor).toBe(`rgb(245, 245, 245)`);
    })

    it('closed 버튼을 클릭하면 anonymous 체크박스가 비활성화된다.', async () => {
      const { clickClosed, AnonymousCheckbox } = renderRoomModal();

      expect(AnonymousCheckbox().parentNode).toBeVisible();

      await clickClosed();

      expect(AnonymousCheckbox().parentNode).not.toBeVisible();
    })

    it('TitleInputbar를 입력하면 제목이 제대로 입력이 되는가?', async () => {
        const { changeTitle, TitleInputbar } = renderRoomModal();
        
        expect(TitleInputbar().value).toBe('');

        changeTitle('title');

        expect(TitleInputbar().value).toBe('title');
    })

    it('양식에 맞게 다 입력한 경우 Letsgo 버튼이 활성화 되는가?', async () => {
      const { changeTitle, LetsGoBtn } = renderRoomModal();

      expect(LetsGoBtn()).toBeDisabled();

      changeTitle('input title');

      expect(LetsGoBtn()).not.toBeDisabled();
    });

    it('lets go 버튼을 누르면 post 요청을 보내는가?', async () => {

    });

    it('random 버튼을 누르면 post 요청을 보내는가?', async () => {

    });
});