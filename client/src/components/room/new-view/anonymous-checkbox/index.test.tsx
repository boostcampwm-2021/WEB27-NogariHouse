/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, render } from '@testing-library/react';
import { CheckBoxProps } from '@common/small-checkbox';
import AnonymousCheckBox from './index';

/*

태스크
1. AnonymousCheckBox 컴포넌트는 사용자가 상호작용에 따라 달라지는 커스텀 체크박스를 렌더링한다.
2. 커스텀 체크박스를 클릭하면 onChange 메서드가 상태가 변한다.
3. 한번 더 체크박스를 클릭하면 이전 상태로 돌아간다.
*/

const text = 'Allow anonymous ?';

function renderAnonymousCheckbox(props?: Partial<CheckBoxProps>) {
  const onChange = jest.fn();

  const result = render(<AnonymousCheckBox onChange={onChange} text={text} {...props} />);

  const CustomCheckbox = () => result.queryByLabelText(text) as HTMLElement;

  async function clickCustom() {
    await act(async () => {
      userEvent.click(CustomCheckbox());
    });
  }

  return {
    result,
    onChange,
    CustomCheckbox,
    clickCustom,
  };
}

describe('<AnonymousCheckBox />', () => {
  it('기본 필드를 렌더링 한다.', async () => {
    const { CustomCheckbox } = renderAnonymousCheckbox();

    expect(CustomCheckbox()).toBeInTheDocument();
  });

  it('체크 여부에 따라 체크박스 값이 변경되어야한다.', async () => {
    const { result, CustomCheckbox } = renderAnonymousCheckbox();
    const component = result.container.querySelector('input') as HTMLInputElement;

    expect(component).not.toBeChecked();

    userEvent.click(CustomCheckbox());

    expect(component).toBeChecked();
  });

  it('체크박스를 누르면 onChange가 호출된다.', async () => {
    const { clickCustom, onChange } = renderAnonymousCheckbox();

    await clickCustom();

    expect(onChange).toHaveBeenCalled();
  });
});
